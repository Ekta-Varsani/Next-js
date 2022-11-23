import NewMeetUp from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/router'
import Head from 'next/head';

function NewMeetupPage() {

    const router = useRouter()

    async function addMeetupHandler(enteredData) {
        console.log(enteredData);
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-type': 'Application/json'
            }
        })

        console.log(await response.json());
        router.push('/')
    }

    return(
        <>
        <Head>
            <title>Add meetup</title>
        </Head>
            <NewMeetUp onAddMeetup={addMeetupHandler} />
        </>
    )
}

export default NewMeetupPage