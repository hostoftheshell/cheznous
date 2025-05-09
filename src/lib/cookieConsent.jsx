import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
// @ts-ignore
import * as CookieConsent from "vanilla-cookieconsent";

export default function CookieConsentComponent() {
  useEffect(() => {
    const runCookieConsent = async () => {
      const cc = await CookieConsent.run({
        root: "body",
        autoShow: true,
        disablePageInteraction: false,
        guiOptions: {
          consentModal: {
            layout: "box",
            position: "bottom right",
            equalWeightButtons: true,
            flipButtons: false,
          },
          preferencesModal: {
            layout: "box",
            equalWeightButtons: true,
            flipButtons: false,
          },
        },

        categories: {
          maps: {
            enabled: false,
            readOnly: false,
            services: {
              googleMaps: {
                onAccept: () => {
                  console.log("Google Maps accepted");
                  window.dispatchEvent(
                    new CustomEvent("cookieConsentChanged", {
                      detail: { maps: true },
                    }),
                  );
                },
                onReject: () => {
                  console.log("Google Maps rejected");
                  window.dispatchEvent(
                    new CustomEvent("cookieConsentChanged", {
                      detail: { maps: false },
                    }),
                  );
                },
              },
            },
          },
        },

        language: {
          default: "fr",
          translations: {
            fr: {
              consentModal: {
                title: "Nous utilisons des cookies",
                description:
                  "Nous utilisons des cookies et d'autres technologies de suivi pour vous proposer l'affichage d'une carte Google Maps sur notre site.",
                acceptAllBtn: "Tout accepter",
                acceptNecessaryBtn: "Tout refuser",
                showPreferencesBtn: "Gérer mes préférences",
                footer:
                  '<a href="/politique-de-confidentialite" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>',
              },
              preferencesModal: {
                title: "Préférences de cookies",
                acceptAllBtn: "Tout accepter",
                acceptNecessaryBtn: "Tout refuser",
                savePreferencesBtn: "Sauvegarder mes préférences",
                closeIconLabel: "Fermer",
                sections: [
                  {
                    title: "Utilisation des cookies",
                    description:
                      "Nous utilisons des cookies pour assurer les fonctionnalités de base du site web et pour améliorer votre expérience en ligne.",
                  },
                  {
                    title: "Cookies strictement nécessaires",
                    description:
                      "Ces cookies sont essentiels au bon fonctionnement du site web.",
                    linkedCategory: "necessary",
                  },
                  {
                    title: "Cookies pour Google Maps",
                    description:
                      'Ces cookies sont utilisés pour afficher la carte Google Maps sur notre site, permettant de visualiser l\'emplacement de notre établissement "Chez Nous".',
                    linkedCategory: "maps",
                  },
                  {
                    title: "Plus d'informations",
                    description:
                      'Pour toute question concernant notre politique en matière de cookies et vos choix, veuillez <a href="/contact" target="_blank" rel="noopener noreferrer">nous contacter</a>.',
                  },
                ],
              },
            },
          },
        },
      });

      if (cc) {
        window.cookieConsent = cc;

        window.dispatchEvent(new Event("cookieConsentInitialized"));

        const mapsConsented = cc.acceptedCategory("maps");
        window.dispatchEvent(
          new CustomEvent("cookieConsentChanged", {
            detail: { maps: mapsConsented },
          }),
        );
      }
    };

    runCookieConsent();
  }, []);

  return null;
}
