import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, ...props }) {

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-white dark:text-primary leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-24 px-10">
                <div className="dark:bg-primary bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 dark:text-white text-center text-primary">
                        <h2 className='text-2xl font-bold'>Welcome, Team Admin!</h2>
                        <p>Stay on top of your tasks and collaborate efficiently. Your success starts here!</p>
                    </div>
                </div>
                <div className="stats stats-vertical mt-5 lg:stats-horizontal shadow grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
                    <div className="stat text-center dark:bg-primary dark:text-white bg-white text-primary">
                        <div className="">Downloads</div>
                        <div className="stat-value">31K</div>
                        <div className="">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat text-center dark:bg-primary dark:text-white bg-white text-primary">
                        <div className="">Downloads</div>
                        <div className="stat-value">31K</div>
                        <div className="">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat text-center dark:bg-primary dark:text-white bg-white text-primary">
                        <div className="">New Users</div>
                        <div className="stat-value">4,200</div>
                        <div className="">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat text-center dark:bg-primary dark:text-white bg-white text-primary">
                        <div className="">New Registers</div>
                        <div className="stat-value">1,200</div>
                        <div className="">↘︎ 90 (14%)</div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
