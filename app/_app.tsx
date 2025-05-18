"use client"

import { useEffect } from "react"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import "../globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Register service worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator && window.workbox !== undefined) {
      const wb = window.workbox

      // Add event listeners to handle PWA lifecycle
      wb.addEventListener("installed", (event) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb.addEventListener("controlling", (event) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb.addEventListener("activated", (event) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: MUST set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      const promptNewVersionAvailable = (event) => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        if (confirm("A newer version of this application is available. Reload to update?")) {
          wb.addEventListener("controlling", (event) => {
            window.location.reload()
          })

          // Send a message to the waiting service worker, instructing it to activate.
          wb.messageSkipWaiting()
        } else {
          console.log(
            "User rejected to reload the web app, keep using old version. New version will be automatically loaded when user opens the app next time.",
          )
        }
      }

      wb.addEventListener("waiting", promptNewVersionAvailable)
      wb.register()
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
