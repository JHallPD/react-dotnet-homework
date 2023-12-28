using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public record Contact
{
    public Contact()
    {
    }

    public Contact(string name, int id)
    {
        Name = name;
        Id = id;
        Email = $"{Name.Replace(" ", "_").ToLower()}@test.com";
    }

    public Contact(string name, string email, string phone, string avatar, string twitter, string notes, DateTime CreatedAt, DateTime UpdatedAt)
    {
        Name = name;
        Email = email;
        Phone = phone;
        Avatar = avatar;
        Twitter = twitter;
        Notes = notes;
        CreatedAt = CreatedAt;
        UpdatedAt = UpdatedAt;

    }


    public int Id { get; set; } // Primary key
    [Column(TypeName = "VARCHAR(100)")]
    public string? Name { get; set; }
    [Column(TypeName = "VARCHAR(100)")]
    public string? Email { get; set; } = "email@demo.com";
    [Column(TypeName = "VARCHAR(100)")]
    public string? Phone { get; set; } = "1234567890";
    public string? Avatar { get; set; } = "/avatars/headshot_1.png";
    public string? Twitter { get; set; } = "TwitterHandle";
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
