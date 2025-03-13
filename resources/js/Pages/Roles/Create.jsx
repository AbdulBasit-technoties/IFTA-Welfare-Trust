import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
export default function Index({ auth, role }) {

  const { data, setData, post, errors } = useForm({
    name: null,

  });


  const submit = (e) => {
    e.preventDefault();
    console.log(data);
    post(route('roles.store'));
  };
  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Roles" />

      <section className="py-24 px-10">
        <form onSubmit={submit} className="mt-6" encType="multipart/form-data">
          <header className="p-3 flex justify-between items-center bg-gray-800 rounded-tl-2xl rounded-tr-2xl text-white">
            <div>
              <h2 className="sm:text-lg text-xs font-medium">Add Role</h2>
              <p className="mt-1 sm:text-sm text-xs">
                Add your user here
              </p>
            </div>
          </header>
          <div className="bg-white rounded-md p-sm:6 p-2 grid grid-cols-12 gap-5 items-center">
            <div className="col-span-12">
              <InputLabel htmlFor="name" value="Name" />
              <TextInput
                id="name"
                className="mt-1 block w-full"
                value={data.name || ''}
                onChange={(e) => setData('name', e.target.value)}
                required
                isFocused
                autoComplete="name"
                type="text"
              />
              <InputError className="mt-2" message={errors.name} />
            </div>
            <div className="flex items-center gap-4 col-span-12">
              <PrimaryButton>Add Role</PrimaryButton>
              <Link
                href={route('roles.index')}
                className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-2xl text-xs text-white capitalize tracking-widest hover:border-gray-700 hover:bg-transparent hover:text-gray-800 transition-all duration-500"
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
