import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK (only once)
if (!getApps().length) {
  initializeApp({
    credential: cert({
  projectId: "broke-bro",
  clientEmail: "firebase-adminsdk-fbsvc@broke-bro.iam.gserviceaccount.com",
  privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDD3uBeigbivbAK\n3H/dIUZ6Ie4iDfqP1yTZPBUlZBYPV3+EAwUbdzJ9BoVMbFSxDujIG6qyLy1TWUFt\nsdwJpbkh7upzMZ3gTnTHic+fV4il5myxCrmWDr8U3vhX+IoAKLX/pQWlylBCZXcx\nPuhfCEqYQNw9plAgs5nhtL04z5XjQAZgUTMZLXj8heMxLGatkJG/aEUw2hjbUOuK\nNV9v37ROFxMYrs6uAbBUwUE6QuirzV2xJtpc9H6N+4DvqujwWXCAJbFiv7j5T+AX\nq5HbxfBM0ar0GuyHSpOdDJZkzWfDranu9qqh8PRrNVvFSrsz7f45O9Hx8dj8cKgx\n2cGv3WPbAgMBAAECggEADINAch7/MZz3PLpkBgxfeY3mreZBYM8DBkhVptMuAEI8\nCILo4J2iFrqZPriXmyKzXD/oN68r22yS8XRbSi0mwTQyELSAEW7xpuL25dxXA8Ik\npMAP+wtrdDnfmOnCZyAyqueFOizNKRtc8e3C389NH0zaxQAgPkvlmLWjIO33Sqe/\nj6rYjS1DlDnmd3RiDTBceu0WGHa/SWfwc4IKkQytbqUYA06mapsTy8swFb1lclXN\nvCxuhny/Nca4TbVoF8wJm7BMTAA7JxaJZIzsLBX5TZQxDTEoaadJQdUrseYRrZxB\n1NyEekTmvDjDU6uNEv112HxZQ7k3NRrS6Z+CAoKHAQKBgQD/XCuGfL3kqD2WuXhA\n70CxIksr6c6l6RgJ11utVUCWmCuHHdnNRNhub+tGKiOG6MhH7hl3rnK1vBodlDoP\nmZeJsUgi8Ma/6MMy5u7tDs1Apb9e1VIFhdfNvA4kVw+cfGHVHNk0n5AB+TLz1vOM\n60jYfbKTECeyAK89T5RivNO4qQKBgQDEXIpEaoLGIjcDVcbOkx4K+H4360YAeHc4\nEj/jKIcTj5w4To/tRydl/6OvWQALCB7YAV7pg7+5VpKV9dVDf0Tp7EMkW67VZY/o\nhH0B2EEUh+rr1PKg4dVoYO1QCBbuRh41m8FAcAgutTg+FJCIDfPaXNQlHVElyBrv\nVzK5KOU24wKBgQC2Im+JBQAMT1NeZfs3lW526Rbkw2b5P0A+BLUG9H+U6gRh4xCu\nMCSO4JTW/sdIOlBfvZu8mViH9xpJbqfa6JoFQ8VH5qRbzREtBTn1K1GKgq30XgKa\nndRGkZMkqFQiMTU2Y9Uoi4aTYcLN2MruAAN9JmpwKl2lwIc9G72ijzwTwQKBgQC5\nSyYCp4ueEl1dXU0MVBFugs0AUZiuCv9dPwNghTbpw4PEMoZoftNz0ccRSWfcAR6x\n8KEys+twpnwO3HsRhYBvSU6WeZnCr2McJCGeYwYOrK+HOVx3aoQqSgTGl8ujrzEE\nn2S+PLnL8aAQHPHCIYByF1TtbPvNLkYUgnFP/oJFxwKBgQCRFogKspG2kCuUUpYR\nYAOmQ+ilos0gZdgi6fKFiOT8G3AZX4XJiGfAj6sGUBbc6RbzLD3vJ+gh6STE2hXO\n2r+YoqUUuR4oGKfldqUhBvuzT67i7QbvNdh2j+cwswoW2uRn16x9V4m49JSb6nl1\nmnpndaWo1bSPvPA328O2/56hCw==\n-----END PRIVATE KEY-----\n",
}),
  });
}

const db = getFirestore();
const reviewsCollection = db.collection("reviews");
// GET: Get a single review by ID
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;
  try {
    const doc = await reviewsCollection.doc(id).get();
    if (!doc.exists) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch review" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;
  try {
    const body = await req.json();

    // Only allow updating certain fields
    const updateData: any = {
      updatedAt: new Date(),
    };
    if (body.text) updateData.text = body.text;
    if (body.body) updateData.body = body.body; // if you use 'body' as the comment field

    await reviewsCollection.doc(id).update(updateData);

    const updatedDoc = await reviewsCollection.doc(id).get();
    return NextResponse.json({ id: updatedDoc.id, ...updatedDoc.data() }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

// DELETE: Delete a review by ID
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;
  try {
    await reviewsCollection.doc(id).delete();
    return NextResponse.json({ message: "Review deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}