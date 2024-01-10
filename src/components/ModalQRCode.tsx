import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import Loading from "./Loading";

export default function ModalQRCode({ isOpen, closeModal, qrCodeBase64 }) {

  useEffect(() => {
    console.log("ModalQRCode montado");
    return () => console.log("ModalQRCode desmontado");
  }, []);

  console.log("ModalQRCode isOpen:", isOpen);
  console.log("ModalQRCode qrCodeBase64:", qrCodeBase64);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl 
                  bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 font-bold mb-2 text-center text-purple"
                  >
                    Leia o QR Code abaixo com o WhatsApp
                  </Dialog.Title>
                  <div className="qr-code-container">
                    { !qrCodeBase64
                        ? <Loading />
                        // ? <Image src="/images/loading.gif" width={50} height={50} alt="Carregando" className="qr-code-img" />
                        : <Image src={`${qrCodeBase64}`} width={300} height={300} alt="QR Code" className="qr-code-img" />
                      }
                  </div>
                  <div className="flex justify-end mt-4">

                    <button
                      type="button"
                      className="
                      bg-gradient-to-t from-purple-500 to-purple-700 text-white
                      px-4 py-2 rounded-md mb-4"
                      onClick={closeModal}
                    >
                      Fechar
                    </button>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
