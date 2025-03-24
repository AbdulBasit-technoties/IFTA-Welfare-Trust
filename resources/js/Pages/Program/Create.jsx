import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth }) {
  const { data, setData, post, errors } = useForm({
    name: "",
    slug: "",
  });

  // Programs list (for radio buttons)
  const programOptions = [
    { id: 1, name: "School", slug: "schools" },
    { id: 2, name: "Higher Education", slug: "higher-educations" },
    { id: 3, name: "Marriage", slug: "marriages" },
    { id: 4, name: "Ration", slug: "rations" },
    { id: 5, name: "Patient", slug: "patients" },
  ];

  // Jab radio button change ho to slug update kare
  const handleRadioChange = (e) => {
    const selectedProgram = programOptions.find((program) => program.slug === e.target.value);
    if (selectedProgram) {
      setData({
        ...data,
        slug: selectedProgram.slug,
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    post(route("programs.store"));
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Add Program" />
      <section className="py-24 px-10">
        <form onSubmit={submit} className="mt-6" encType="multipart/form-data">
          <header className="p-3 flex justify-between items-center bg-primary rounded-tl-2xl rounded-tr-2xl text-white">
            <div>
              <h2 className="sm:text-lg text-xs font-medium">Add Program</h2>
              <p className="mt-1 sm:text-sm text-xs">Add your program here</p>
            </div>
          </header>

          <div className="bg-white rounded-md p-sm:6 p-2 grid grid-cols-12 gap-5 items-center">
            {/* Radio Buttons */}
            <div className="col-span-12">
              <InputLabel value="Select Program Type" />
              <div className="flex flex-wrap gap-4 mt-2">
                {programOptions.map((program) => (
                  <label key={program.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="program"
                      value={program.slug}
                      checked={data.slug === program.slug}
                      onChange={handleRadioChange}
                      className="form-radio text-blue-600"
                    />
                    <span>{program.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Name Input (User Typed) */}
            <div className="col-span-12">
              <InputLabel htmlFor="name" value="Program Name" />
              <TextInput
                id="name"
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
                autoComplete="off"
                type="text"
              />
              <InputError className="mt-2" message={errors.name} />
            </div>

            {/* Slug (Auto-filled from radio) */}
            <div className="col-span-12">
              <InputLabel htmlFor="slug" value="Slug" />
              <TextInput id="slug" className="mt-1 block w-full" value={data.slug} required readOnly type="text" />
              <InputError className="mt-2" message={errors.slug} />
            </div>

            <div className="flex items-center gap-4 col-span-12">
              <PrimaryButton>Add Program</PrimaryButton>
              <Link
                href={route("programs.index")}
                className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-primary hover:bg-transparent hover:text-primary transition-all duration-500"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </section>
    </AuthenticatedLayout>
  );
}
