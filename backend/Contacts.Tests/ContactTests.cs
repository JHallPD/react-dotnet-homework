using Moq;


namespace Contacts.Tests
{
    // the way the backend is setup there is no contact controller or repository
    // cypress covers most of this with e2e testing so there is no benefit to fixing this to cover create, read, update and delete
    public class ContactTests
    {

        [Fact]
        public void Constructor_Sets_Name_And_Id()
        {
            var contact = new Contact("Test Name", 1);
            Assert.Equal("Test Name", contact.Name);
            Assert.Equal(1, contact.Id);
        }

        [Fact]
        public void Constructor_Sets_All_Properties()
        {
            var contact = new Contact("Test Name", "test@test.com", "1234567890", "avatar.png", "@test", "Test notes", DateTime.Parse("0001-01-01 00:00:00.0000000"), DateTime.Parse("0001-01-01 00:00:00.0000000"));
            Assert.Equal("Test Name", contact.Name);
            Assert.Equal("test@test.com", contact.Email);
            Assert.Equal("1234567890", contact.Phone);
            Assert.Equal("avatar.png", contact.Avatar);
            Assert.Equal("@test", contact.Twitter);
            Assert.Equal("Test notes", contact.Notes);
            Assert.Equal(DateTime.Parse("0001-01-01 00:00:00.0000000"), contact.CreatedAt);
            Assert.Equal(DateTime.Parse("0001-01-01 00:00:00.0000000"), contact.UpdatedAt);
        }
    }
}

