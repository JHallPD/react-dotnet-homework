import { Form, redirect, useLoaderData } from "react-router-dom";
import { ContactType } from "../types";


// this is about 99% what is needed for creation so I adjusted the params to be optional and fixed the action to work for both creation and editing
export default function ContactForm() {
  const { contact } = useLoaderData()?useLoaderData() as { contact: ContactType }:[];

  return (
    <Form method="post" id="contact-form">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="name"
                id="name"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Name"
                defaultValue={contact?.name}
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="email@example.com"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={contact?.email}
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Phone
          </label>
          <div className="mt-2">
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(123) 456-7890"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={contact?.phone}
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Twitter
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                twitter.com/
              </span>
              <input
                type="text"
                name="twitter"
                id="twitter"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="janesmith"
                defaultValue={contact?.twitter}
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Avatar URL
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="avatar"
                id="avatar"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="/avatar.jpg"
                defaultValue={contact?.avatar}
              />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Notes
          </label>
          <div className="mt-2">
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={contact?.notes}
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Write a few sentences about this person.
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

interface ActionParams {
  contactId: string;
}

export async function action({
  params,
  request,
}: {
  params: ActionParams;
  request: Request;
}) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  // post the json to the api /contacts/ or /contacts/:contactId
  console.log("updates = ", updates);
  await fetch(params?.contactId !== undefined?`/api/contacts/${params.contactId}`:`/api/contacts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  }).then(function(response) {
    // node finishes here
    return response.json();
  }).then(function(data) {
    // dotnet need this
    console.log(data);  
    const redirectId = params.contactId? params.contactId: data.id;
    window.location.href = `/contacts/${redirectId}`;
  });
  // if I dont put this here it briefly errors out. 
  // If I move the redirect it does not error but requires me to make an id var to pass out of the .then and so I did this instead
  return null
  
}

