export default function ApplicationLogo(props) {
    return (
        <>
            <img src="/images/logo-white.png" alt="Logo" {...props} className="lg:w-2/4 sm:w-3/4 w-full dark:hidden block" />
            <img src="/images/logo-dark.png" alt="Site Logo" {...props} className="lg:w-2/4 sm:w-3/4 w-full hidden dark:block" />
        </>
    );
}
