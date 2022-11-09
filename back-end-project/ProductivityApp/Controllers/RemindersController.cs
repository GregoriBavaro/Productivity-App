using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductivityApp.Dtos.ReminderDtos;
using ProductivityApp.Services.Interfaces;
using ProductivityApp.Shared.CustomReminderExceptions;
using ProductivityApp.Shared.CustomUserExceptions;
using ProductivityApp.Shared.ServerExceptions;
using System.Security.Claims;


namespace ProductivityApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RemindersController : ControllerBase
    {
        private readonly IReminderService _reminderService;

        public RemindersController(IReminderService reminderService)
        {
            _reminderService = reminderService;
        }

        [HttpGet("getAllReminders")]
        public async Task<ActionResult<List<ReminderDto>>> GetAllReminders()
        {
            try
            {
                var userId = GetAuthorizedUserId();
                return Ok(await _reminderService.GetAllReminders(userId));
            }
            catch (InternalServerException e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReminderDto>> GetReminderById(int id)
        {
            try
            {
                return Ok(await _reminderService.GetReminderById(id));
            }
            catch (ReminderNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (InternalServerException e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost("addReminder")]
        public async Task<IActionResult> AddReminder([FromBody] AddReminderDto addReminderDto)
        {
            try
            {
                var userId = GetAuthorizedUserId();
                await _reminderService.AddReminder(addReminderDto, userId);
                return StatusCode(StatusCodes.Status201Created, "New reminder was added");
            }
            catch (ReminderDataException e)
            {
                return BadRequest(e.Message);
            }
            catch (InternalServerException e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReminder(int id)
        {
            try
            {
                await _reminderService.DeleteReminder(id);
                return StatusCode(StatusCodes.Status204NoContent, $"Session with id {id} was successfully deleted!");
            }
            catch (ReminderNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (InternalServerException e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPut("updateReminder")]
        public async Task<IActionResult> UpdateSession([FromBody] UpdateReminderDto updateReminderDto)
        {
            try
            {
                await _reminderService.UpdateReminder(updateReminderDto);
                return StatusCode(StatusCodes.Status204NoContent, $"{updateReminderDto.Id} was updated!");
            }
            catch (ReminderNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (ReminderDataException e)
            {
                return BadRequest(e.Message);
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
