import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { HelmetProvider, Helmet } from "react-helmet-async"; // ✅ Corrected Import

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob("./Pages/**/*.jsx")),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <HelmetProvider>
                <Helmet>
                    <link rel="icon" type="image/png" href="/images/fav-icon.png" />
                </Helmet>
                <App {...props} />
            </HelmetProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
