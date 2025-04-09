import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectComponent from "@/Components/SelectComponent";
import TextArea from "@/Components/TextArea";
export default function Index({ auth, beneficiaries, institute, performance }) {

  const { data, setData, post, errors } = useForm({
    uid: null,
    institute_id: null,
    performance: null,
    performance_photo: null,
    comment: null
  });


  const handleBeneficiaryChange = (selectedValue) => {
    setData('uid', selectedValue);
    router.get(route("beneficiary-performances.create"),
      { uid: selectedValue },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => console.log("beneficiary changed successfully!"),
        onError: (errors) => console.error("Error:", errors),
      }
    );
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(data);
    post(route('beneficiary-performances.store'));
  };
  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Performance" />

      <section className="py-24 px-10">
        <form onSubmit={submit} className="mt-6" encType="multipart/form-data">
          <header className="p-3 flex justify-between items-center bg-primary rounded-tl-2xl rounded-tr-2xl text-white">
            <div>
              <h2 className="sm:text-lg text-xs font-medium">Add Performance</h2>
              <p className="mt-1 sm:text-sm text-xs">
                add your performance here
              </p>
            </div>
          </header>
          <div className="bg-white rounded-md p-sm:6 p-2 grid grid-cols-12 gap-5 items-center">
            <div className="md:col-span-6 col-span-12">
              <InputLabel htmlFor="uid" value="Beneficiary Name" />
              <SelectComponent
                id="uid"
                value={data.uid}
                onChange={handleBeneficiaryChange}
                options={beneficiaries}
                className="mt-1 block w-full"
              />
              <InputError className="mt-2" message={errors.uid} />
            </div>
            <div className="md:col-span-6 col-span-12">
              <InputLabel htmlFor="institute_id" value="Institute Name" />
              <SelectComponent
                id="institute_id"
                value={data.institute_id}
                onChange={(e) => setData('institute_id', e)}
                options={institute}
                className="mt-1 block w-full"
              />
              <InputError className="mt-2" message={errors.institute_id} />
            </div>
            <div className="md:col-span-6 col-span-12">
              <InputLabel htmlFor="performance" value="Performance" />
              <SelectComponent
                id="performance"
                value={data.performance}
                onChange={(e) => setData('performance', e)}
                options={performance}
                className="mt-1 block w-full"
              />
              <InputError className="mt-2" message={errors.performance} />
            </div>
            <div className="md:col-span-6 col-span-12">
              <InputLabel htmlFor="performance_photo" value="Performance Image" />
              <TextInput
                id="performance_photo"
                className="mt-1 block w-full"
                value={data.performance_photo || ''}
                onChange={(e) => setData({ ...data, performance_photo: e.target.files[0] })}
                required
                isFocused
                autoComplete="performance_photo"
                type="file"
              />
              <InputError className="mt-2" message={errors.performance_photo} />
            </div>

            {/* Comment Box */}
            <div className="col-span-12">
              <InputLabel htmlFor="comment" value="Comment" />
              <TextArea
                id="comment"
                value={data.comment || ''}
                onChange={(e) => setData('comment', e.target.value)}
                className="mt-1 block w-full text-gray-800"
              />
              <InputError className="mt-2" message={errors.comment} />
            </div>
            <div className="flex items-center gap-4 col-span-12">
              <PrimaryButton>Add Performance</PrimaryButton>
              <Link
                href={route('beneficiary-performances.index')}
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
