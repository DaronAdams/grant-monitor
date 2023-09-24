
public class GenerateId
{
    public static long Id { get; set; }

    public static long GenerateNewId()
    {
        long ticks = DateTime.UtcNow.Ticks;
        int randomValue = new Random().Next();
        long uniqueId = (ticks << 32) | (uint)randomValue;

        return uniqueId;
    }
}