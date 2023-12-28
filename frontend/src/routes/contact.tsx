import { Form, useLoaderData } from "react-router-dom";
import { ContactType } from "../types";

// something is wrong here where on load all the forms are being triggered. 

export default function Contact() {
    const { contact } = useLoaderData() as { contact: ContactType };

  return (
    <div id="contact" className="flex space-x-5">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || undefined}
        />
      </div>

      <div>
        <h1 className="text-lg font-bold">
          {contact.name ? (
            <>
              {contact.name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
        </h1>

        {contact.twitter && (
          <p className="italic">
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.email && (
          <p>
            <a
              href="#"
            >
              {contact.email}
            </a>
          </p>
        )}

        {contact.phone && (
          <p>
            <a
              href="#"
            >
              {contact.phone}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div className="flex space-x-2 rounded-md bg-cyan-100 p-2 mt-2">
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
        </div>
        <div className="flex space-x-2 rounded-md bg-cyan-100 p-2 m mt-2">
          <button type="submit" onClick={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
                action(contact.id);
            }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }: { params: { contactId: string } }) {
    console.log("params = ", params);
    const contact = await fetch(`/api/contacts/${params.contactId}`).then(res => res.json());
    console.log("loaded the contact = ", contact);

    return { contact };

}

interface ActionParams {
  contactId: string;
}

//  the form was prefiring without any user input so it has been removed for a traditional button onClick
export async function action( contactId: string ) {
  await fetch(`/api/contacts/${contactId}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  window.location.href = `/`;
  
}
