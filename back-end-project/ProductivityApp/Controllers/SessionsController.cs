using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductivityApp.Dtos.SessionDtos;
using ProductivityApp.Services.Interfaces;
using ProductivityApp.Shared.CustomSessionExceptions;
using ProductivityApp.Shared.CustomUserExceptions;
using ProductivityApp.Shared.ServerExceptions;
using System.Security.Claims;

namespace ProductivityApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        private readonly ISessionService _sessionService;

        public SessionsController(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }

        [HttpGet("getAllSessions")]
        public async Task<ActionResult<List<SessionDto>>> GetAllSession()
        {
            try
            {
                

                //get the role claim from token 
                var userId = GetAuthorizedUserId();
                return Ok(await _sessionService.GetAllSessions(userId));


            }
            catch (InternalServerException e)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


        [HttpGet("{id}")]

        public async Task<ActionResult<SessionDto>> GetSessionById(int id)
        {
            try
            {
                return Ok(await _sessionService.GetSessionById(id));

            }
            catch (SessionNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (InternalServerException e)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


        [HttpPost("addSession")]

        public async Task<IActionResult> AddSession([FromBody] AddSessionDto addSessionDto)
        {
            try
            {
                var userId = GetAuthorizedUserId();
                await _sessionService.AddSession(addSessionDto,userId);
                return StatusCode(StatusCodes.Status201Created, "New session was added");

            }
            catch (SessionDataException e)
            {
                return BadRequest(e.Message);
            }
            catch (InternalServerException e)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPut("updateSession")]

        public async Task<IActionResult> UpdateSession([FromBody] UpdateSessionDto updateSessionDto)
        {
            try
            {
                await _sessionService.UpdateSession(updateSessionDto);
                return StatusCode(StatusCodes.Status204NoContent, $"{updateSessionDto.Id} was updated!");

            }
            catch (SessionNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (SessionDataException e)
            {
                return BadRequest(e.Message);
            }
            catch (InternalServerException e)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteSession(int id)
        {
            try
            {
                await _sessionService.DeleteSession(id);
                return StatusCode(StatusCodes.Status204NoContent, $"Session with id {id} was successfully deleted!");

            }
            catch (SessionNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (InternalServerException e)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        private int GetAuthorizedUserId()
        {
            if (!int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?
                .Value, out var userId))
            {
                string? name = User.FindFirst(ClaimTypes.Name)?.Value;
                throw new UserNotFoundException(
                    "Name identifier claim does not exist!");
            }
            return userId;
        }
    }
}
