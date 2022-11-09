using System.Text.Json.Serialization;

namespace ProductivityApp.Domain.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum  PriorityEnum
    {
        High = 0,
        Medium, 
        Low
    }
}
