import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
export default function Index({ auth }) {

  const { data, setData, post, errors } = useForm({
    name: null,
    email: null,
    password: null,
    phone: null,
    address: null,
    role: 'Donor',
  });


  const submit = (e) => {
    e.preventDefault();
    console.log(data);
    post(route('donors.store'));
  };
  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Donor" />

      <section className="py-24 px-10">
        <form onSubmit={submit} className="mt-6" encType="multipart/form-data">
          <header className="p-3 flex justify-between items-center bg-primary rounded-tl-2xl rounded-tr-2xl text-white">
            <div>
              <h2 className="sm:text-lg text-xs font-medium">Add Donor</h2>
              <p className="mt-1 sm:text-sm text-xs">
                add your donor here
              </p>
            </div>
          </header>
          <div className="bg-white rounded-md p-sm:6 p-2 grid grid-cols-12 gap-5 items-center">
            <div className="sm:col-span-6 col-span-12">
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
            <div className="sm:col-span-6 col-span-12">
              <InputLabel htmlFor="email" value="Email" />
              <TextInput
                id="email"
                className="mt-1 block w-full"
                value={data.email || ''}
                onChange={(e) => setData('email', e.target.value)}
                required
                isFocused
                autoComplete="email"
                type="email"
              />
              <InputError className="mt-2" message={errors.email} />
            </div>
            <div className="sm:col-span-6 col-span-12">
              <InputLabel htmlFor="password" value="Password" />
              <TextInput
                id="password"
                className="mt-1 block w-full"
                value={data.password || ''}
                onChange={(e) => setData('password', e.target.value)}
                required
                isFocused
                autoComplete="password"
                type="password"
              />
              <InputError className="mt-2" message={errors.password} />
            </div>
            <div className="sm:col-span-6 col-span-12">
              <InputLabel htmlFor="phone" value="Phone" />
              <TextInput
                id="phone"
                className="mt-1 block w-full"
                value={data.phone || ''}
                onChange={(e) => setData('phone', e.target.value)}
                required
                isFocused
                autoComplete="phone"
                type="number"
              />
              <InputError className="mt-2" message={errors.phone} />
            </div>
            <div className="col-span-12">
              <InputLabel htmlFor="address" value="Address" />
              <TextArea
                id="address"
                value={data.address || ''}
                onChange={(e) => setData('address', e.target.value)}
                className="mt-1 block w-full"
              />
              <InputError className="mt-2" message={errors.address} />
            </div>
            <div className="flex items-center gap-4 col-span-12">
              <PrimaryButton>Add Donor</PrimaryButton>
              <Link
                href={route('donors.index')}
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
