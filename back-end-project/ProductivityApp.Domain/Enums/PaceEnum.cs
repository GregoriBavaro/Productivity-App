using System.Text.Json.Serialization;

namespace ProductivityApp.Domain.Enums
{

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public  enum PaceEnum
    {
        High =1,
        Medium,
        Low
    }
}
