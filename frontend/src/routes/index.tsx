import { Form, useLoaderData } from "react-router-dom";
import { ContactType } from "../types";
import Contact from "../components/Contact";

export default function Index() {
    const { contacts } = useLoaderData() as { contacts: ContactType[] };
    console.log("contacts from loader hook = ", contacts);

  return contacts.length ? (
      <>
    <div className="flex space-x-2 rounded-md bg-cyan-100 p-2 mt-2 w-min mb-12 items-center">
        <Form action="create">
            <button type="submit">Create</button>
        </Form>
    </div>
    <ul className="flex flex-col lg:grid grid-cols-3 gap-4">
        { contacts.map((contact) => <Contact contact={contact} key={contact.id} />) }
    </ul>
      </>

    ) : (
        <p>No contacts found.</p>
    );
}

export async function loader() {
    const contacts = await fetch('/api/contacts').then(res => res.json());
    console.log("loaded the contacts = ", contacts);
    return { contacts };
}
