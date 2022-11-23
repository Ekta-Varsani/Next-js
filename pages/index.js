import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import  Head  from 'next/head'
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req
//   const res = context.res
//   return{
//     props: {
//       meetups: dummy
//     }
//   }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect("mongodb://localhost:27017/meetup");
  const db = client.db();

  const meetupCollection = db.collection("meetup");

  const meetups = await meetupCollection.find({}).toArray()

  client.close()
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString()
      })),
    },
  };
}

export default HomePage;
