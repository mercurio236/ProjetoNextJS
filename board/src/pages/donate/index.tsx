import styles from './styles.module.scss';
import Head from 'next/head';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import firebase from '../services/firebaseConnection';

import { PayPalButtons } from '@paypal/react-paypal-js'

//AZ_BPCcd2lVN8kaKPwgpuBbljXOZjaiWYjeJAeKKnh3ihTQ8KDP5B-bqKkXsinZ7b5OnnU4hIw8fJ5PB
//<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>


interface DonateProps {
    user: {
        name: string;
        id: string;
        image: string
    }
}

export default function Donate({ user }: DonateProps) {
    const [vip, setVip] = useState(false);

    async function handleSaveDonate() {
        await firebase.firestore().collection('users')
            .doc(user.id)
            .set({
                donate: true,
                lastDonate: new Date(),
                image: user.image
            })
            .then(() => {
                setVip(true)
            })
    }


    return (
        <>
            <Head>
                <title>Ajude a plataforma Board ficar Online</title>
            </Head>

            <main className={styles.container}>
                <img src="/images/rocket.svg" alt="Seja Apoiador" />

                {
                    vip && (
                        <div className={styles.vip}>
                            <img src={user.image} alt="Foto de perfil do usuário" />
                            <span>Parabén você é um novo apoiador!</span>
                        </div>
                    )
                }

                <h1>Seja um apoioador deste projeto 🏆</h1>
                <h3>Contribua <span>R$ 1,00</span></h3>
                <strong>Apareça na nossa home</strong>

                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: '1'
                                }
                            }]
                        })
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then(function (details) {
                            console.log('Compra aprovada: ' + details.payer.name.given_name);
                            handleSaveDonate()
                        })
                    }}
                />
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (!session?.id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const user = {
        nome: session?.user.name,
        id: session?.id,
        image: session?.user.image
    }

    return {
        props: {
            user
        }
    }
}