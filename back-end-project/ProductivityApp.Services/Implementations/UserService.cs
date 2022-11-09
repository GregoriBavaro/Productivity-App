using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using ProducitivityApp.DataAccess;
using ProducitivityApp.DataAccess.Interfaces;
using ProductivityApp.Domain.Entities;
using ProductivityApp.Dtos.UserDtos;
using ProductivityApp.Mappers.UserMappers;
using ProductivityApp.Services.Interfaces;
using ProductivityApp.Shared;
using ProductivityApp.Shared.CustomUserExceptions;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Security.Cryptography;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;
using Task = System.Threading.Tasks.Task;

namespace ProductivityApp.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IOptions<AppSettings> _options;
        private readonly ProductivityAppDbContext _dbContext;
        private readonly IConfiguration _config;

        public UserService(IUserRepository userRepository, IOptions<AppSettings> options, ProductivityAppDbContext dbContext, IConfiguration config)
        {
            _userRepository = userRepository;
            _options = options;
            _dbContext = dbContext;
            _config = config;
        }

        public async Task<ServiceResponse<string>> LogIn(string email, string password)
        {


            var response = new ServiceResponse<string>();
            var userDb = await _userRepository.GetUserByEmail(email);

            if (userDb == null)
            {
                response.Success = false;
                response.Message = "User not found";
            }


            else if (!VerifyPasswordHash(password, userDb.PasswordHash, userDb.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Wrong password";
            }
            // if (userDb?.VerifiedAt == null)
            //{
            //  response.Success = false;
            //response.Message = "User is not verified";
            // }
            else
            {
                response.Data = CreateToken(userDb);
                response.Message = $"Welcome back {userDb.Fullname}";
            }
            return response;
        }

        public async Task<ServiceResponse<int>> Register(RegisterUserDto registerUserDto)
        {
            ServiceResponse<int> response = new ServiceResponse<int>();


            await ValidateUserAsync(registerUserDto);
            var checkUserByEmail = await _userRepository.GetUserByEmail(registerUserDto.Email);
            if (checkUserByEmail != null)
            {
                response.Success = false;
                response.Message = $"The email {registerUserDto.Email} is already in use.";
                return response;
            }

            CreatePasswordHash(registerUserDto.Password, out byte[] passwordHash, out byte[] passwordSalt);

            User userDb = registerUserDto.ToUserDb();


            userDb.PasswordHash = passwordHash;
            userDb.PasswordSalt = passwordSalt;
            //  userDb.VerificationToken = CreateRandomToken();


            await _userRepository.Add(userDb);


            response.Data = userDb.Id;
            return response;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);
            }
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>

            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.NameIdentifier,user.Role.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Email.ToString())
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding
                .UTF8.GetBytes(_options.Value.Token));

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            }; // this object gets information needed to create the final token

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token); // final token 
        }

        public async Task<ServiceResponse<List<UserDto>>> GetAllUsers()
        {
            var response = new ServiceResponse<List<UserDto>>();

            var usersDb = await _userRepository.GetAll();
            response.Data = usersDb.Select(u => u.ToUserDto()).ToList();
            return response;
        }

        public async Task<ServiceResponse<UserDto>> GetUserById(int id)
        {
            var response = new ServiceResponse<UserDto>();

            var userDb = await _userRepository.GetById(id);
            if (userDb != null)
            {
                response.Data = userDb.ToUserDto();
            }
            else
            {
                response.Success = false;
                response.Message = "User not found!";
            }
            return response;
        }

        public async Task<ServiceResponse<List<UserDto>>> DeleteUser(int id)
        {
            ServiceResponse<List<UserDto>> response = new ServiceResponse<List<UserDto>>();

            User userDb = await _userRepository.GetById(id);
            if (userDb != null)
            {
                await _userRepository.Delete(userDb);
                var usersDb = await _userRepository.GetAll();
                response.Data = usersDb.Select(u => u.ToUserDto()).ToList();
            }
            else
            {
                response.Success = false;
                response.Message = "User not found!";
            }
            return response;

        }
        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
        private async Task<ServiceResponse<AsyncVoidMethodBuilder>> ValidateUserAsync(RegisterUserDto registerUserDto)
        {
            ServiceResponse<AsyncVoidMethodBuilder> response = new ServiceResponse<AsyncVoidMethodBuilder>();


            if (string.IsNullOrEmpty(registerUserDto.Email))
            {
                response.Success = false;
                response.Message = "Please enter your email.";
                return response;
            }

            if (string.IsNullOrEmpty(registerUserDto.Username) || string.IsNullOrEmpty(registerUserDto.Password) || string.IsNullOrEmpty(registerUserDto.ConfirmPassword))
            {
                response.Success = false;
                response.Message = "Username and password are required fields.";
                return response;
            }
            if (registerUserDto.Username.Length > 30)
            {
                response.Success = false;
                response.Message = "Username: Maximum length for username is 30 characters.";
                return response;

            }
            if (string.IsNullOrEmpty(registerUserDto.Fullname) && registerUserDto.Fullname.Length > 50)
            {
                response.Success = false;
                response.Message = "Username: Maximum length for fullname is 50 characters.";
                return response;
            }


            if (registerUserDto.Password != registerUserDto.ConfirmPassword)
            {
                response.Success = false;
                response.Message = "Passwords do not match.";
                return response;
            }

            var userDb = await _userRepository.GetUserByUsername(registerUserDto.Username);
            if (userDb != null)
            {
                response.Success = false;
                response.Message = $"The username {registerUserDto.Username} is already in use.";
                return response;
            }
            if (await _userRepository.EmailExists(registerUserDto.Email))
            {
                response.Success = false;
                response.Message = $"The email {registerUserDto.Email} is already in use.";
                return response;
            }
            var userDbEmail = await _userRepository.GetUserByEmail(registerUserDto.Email);
            if (userDbEmail != null)
            {
                response.Success = false;
                response.Message = $"The email {registerUserDto.Email} is already in use.";
                return response;
            }
            return response;
        }

        //public async Task<ServiceResponse<string>> Verify(string token)
        //{
        //    var response = new ServiceResponse<string>() { };
        //    var userDb = await _userRepository.GetUserByToken(token);
        //    if (userDb == null)
        //    {
        //        response.Success = false;
        //        response.Message = $"You are trying to access token {token} that does not exist! ";

        //    }
        //    userDb.VerifiedAt = DateTime.UtcNow.AddHours(1);
        //    await _dbContext.SaveChangesAsync();

        //    response.Data = token;
        //    return response;

        //}

        public async Task ForgotPassword(string email)
        {
            var userDb = await _userRepository.GetUserByEmail(email);
            if (userDb == null)
            {
                throw new UserDataException($"There is no user with this email {email}.");
            }

            userDb.PasswordResetToken = CreateRandomToken();
            userDb.ResetTokenExpires = DateTime.UtcNow.AddHours(1);
            await _dbContext.SaveChangesAsync();
            SendEmail(email);

        }

        public async Task ResetPassword(ResetPasswordDto request)
        {
            var userDb = await _userRepository.GetUserByResetPasswordToken(request.Token);

            if (userDb == null || userDb.ResetTokenExpires < DateTime.UtcNow)
            {
                throw new UserDataException($"There is no such a token in the database  or your token may been expired.");
            }
            CreatePasswordHash(request.NewPassword, out byte[] passwordHash, out byte[] passwordSalt);

            request.ResetPasswordMapper(userDb);

            userDb.PasswordHash = passwordHash;
            userDb.PasswordSalt = passwordSalt;
            userDb.PasswordResetToken = null;
            userDb.ResetTokenExpires = null;

            await _dbContext.SaveChangesAsync();
            //127.0.0.1:5500
        }

        private async void SendEmail(string dBemail)
        {
            var request = new EmailObj() { };
            var userDb = await _userRepository.GetUserByEmail(dBemail);
            if (userDb == null)
            {
                throw new UserDataException($"There is no user with this email {dBemail}.");
            }
            string input = String.Format("Follow the link to reset your password. Click {0} for more information." +
                "Do not reply to this message.",
                    "<a href=\"http://127.0.0.1:5500/src/redirect.html\">here</a>");

            //string mailstring = "Blah blah blah blah. Click <a href=\"http://127.0.0.1:5500/src/index.html\">here</a> for more information.";
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(request.ProductivityApp = _config.GetSection("EmailUsername").Value));
            email.To.Add(MailboxAddress.Parse(request.To = userDb.Email));
            email.Subject = request.Subject = "You may reset your password now";
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = request.Body = input };

            using var smpt = new SmtpClient(); // mailkit.net.smpt
            smpt.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls); //smpt.gmail.com if you want your sender to be gmail, -||- live.com(hotmail), -||- ofice365.com , connection method
            smpt.Authenticate(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
            smpt.Send(email);
            smpt.Disconnect(true);
        }

        public async Task<ServiceResponse<string>> GetPasswordResetToken(string email)
        {
            var response = new ServiceResponse<string>();
            var userDb = await _userRepository.GetUserByEmail(email);
            if (userDb == null)
            {
                response.Success = false;
                response.Message = "Invalid email.";
            }

            response.Data = userDb.PasswordResetToken;
            return response;
        }
    }
}
//conect and authentitecate with smtp sever , we use the gmail server domain to send email request through smpt clieng
//user email level clients port 456 for ssl conection -> ssl stands for secure socket layer , protocol for web broswer and servers that allows for athtentitacion , ecryption and decryption for data send over email
////Mime -> multi purpose internet mail extension , internet standar to support text in characters sets rather than ascii , mime message give some values
//Simple mail transfer protocol

//System.Net.Sockets.SocketException: 'A connection attempt failed because the connected party did not properly respond after a period of time,
//or established connection failed because connected host has failed to respond.'


//To help keep your account secure, from May 30, 2022, ​​Google no longer supports the use of third-party apps or devices which ask you to sign in to your Google Account using only your username and password.

//Important: This deadline does not apply to Google Workspace or Google Cloud Identity customers. The enforcement date for these customers will be announced on the Workspace blog at a later date.

//For more information, continue to read.