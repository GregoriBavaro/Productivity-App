
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductivityApp.Dtos.UserDtos;
using ProductivityApp.Services.Interfaces;
using ProductivityApp.Shared;
using ProductivityApp.Shared.CustomUserExceptions;
using ProductivityApp.Shared.ServerExceptions;

namespace ProductivityApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(RegisterUserDto request)
        {
            ServiceResponse<int> response = await _userService.Register(request);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<string>>> Login(LoginUserDto request)
        {
            ServiceResponse<string> response = await _userService.LogIn(request.Email, request.Password);


            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        //[AllowAnonymous]
        //[HttpPost("verify")]


        //public async Task<ActionResult<ServiceResponse<string>>>  Verify(string token)
        //{
        //    //the idea is upon registration you send an email to the user 
        //    // where you put this token as a query parametar
        //    try
        //    {
        //        ServiceResponse<string> response = await _userService.Verify(token);
        //        return Ok(response);
        //    }
        //    catch (UserDataException e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //    catch (InternalServerException e)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        //    }

        //}
        [AllowAnonymous]
        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            try
            {
                await _userService.ForgotPassword(email);
                return Ok("You may now reset your password");
            }
            catch (UserDataException e)
            {
                return BadRequest(e.Message);
            }
            catch (InternalServerException e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet("getPasswordResetToken")]

        public async Task<ActionResult<ServiceResponse<string>>> GetPasswordToken(string email)
        {


            ServiceResponse<string> response = await _userService.GetPasswordResetToken(email);


            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);



        }





        [AllowAnonymous]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto request)
        {
            try
            {
                await _userService.ResetPassword(request);
                return Ok("Password successfully reset.");
            }
            catch (UserDataException e)
            {
                return BadRequest(e.Message);
            }
            catch (InternalServerException e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        //[AllowAnonymous]
        // [HttpPost("sendEmailTest")]
        // public IActionResult SendEmail(EmailObj request)
        // {

        //     try
        //     {
        //         _userService.SendEmail(request);
        //         return Ok("Email sent!");
        //     }
        //     catch (InternalServerException e)
        //     {
        //         return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        //     }




        //}

        [HttpGet("getAll")]

        public async Task<ActionResult<ServiceResponse<List<UserDto>>>> Get()
        {
            try
            {
                return Ok(await _userService.GetAllUsers());
            }
            catch (InternalServerException e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<ServiceResponse<UserDto>>> GetSingle(int id)
        {
            try
            {
                return Ok(await _userService.GetUserById(id));
            }
            catch (InternalServerException e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<List<UserDto>>>> Delete(int id)
        {
            try
            {
                var response = await _userService.DeleteUser(id);
                if (response.Data == null)
                {
                    return NotFound(response);
                }

                return Ok(response);
            }
            catch (InternalServerException e)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
