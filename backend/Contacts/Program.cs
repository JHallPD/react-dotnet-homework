using Microsoft.EntityFrameworkCore;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ContactContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.Urls.Add("http://localhost:5000");

// health check
app.MapGet("/", () => "OK");

// get all contacts
app.MapGet("/contacts/", (ContactContext context) =>
{
    return context.Contacts.ToList();
});

// get a contact
app.MapGet("/contacts/{id}", (ContactContext context, int id) =>
{
    return context.Contacts.FirstOrDefault(c => c.Id == id);
});

// create a contact
app.MapPost("/contacts/", async (ContactContext context, HttpContext httpContext) =>
{
    var requestBody = await new StreamReader(httpContext.Request.Body).ReadToEndAsync();
    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    var contact = JsonSerializer.Deserialize<Contact>(requestBody, options);
    context.Contacts.Add(contact);
    await context.SaveChangesAsync();
    return Results.Created("Contact created successfully", contact);
});

// deleted a contact
app.MapPost("/contacts/{id}/delete", async (ContactContext context, HttpContext httpContext, int id) =>
{
    var contactToDelete = context.Contacts.FirstOrDefault(c => c.Id == id);
    context.Contacts.Remove(contactToDelete);
    if (contactToDelete != null)
    {
        await context.SaveChangesAsync();
        return Results.Ok("Contact deleted successfully");
    }
    return Results.NotFound("Contact not found.");
});

// Update a contact
app.MapPost("/contacts/{id}", async (ContactContext context, HttpContext httpContext, int id) =>
{
    var requestBody = await new StreamReader(httpContext.Request.Body).ReadToEndAsync();
    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    var contact = JsonSerializer.Deserialize<Contact>(requestBody, options);
    var contactToUpdate = context.Contacts.FirstOrDefault(c => c.Id == id);
    if (contactToUpdate != null)
    {
        contactToUpdate.Name = contact.Name;
        contactToUpdate.Email = contact.Email;
        contactToUpdate.Phone = contact.Phone;
        contactToUpdate.Avatar = contact.Avatar;
        contactToUpdate.Twitter = contact.Twitter;
        contactToUpdate.Notes = contact.Notes;

        await context.SaveChangesAsync();
        return Results.Ok("Contact updated successfully.");
    }
    return Results.NotFound("Contact not found.");
});

app.Run();
