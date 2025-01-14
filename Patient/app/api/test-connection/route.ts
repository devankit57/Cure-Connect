import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("appointmentsDB")
    
    // Test the connection by getting the collections list
    const collections = await db.listCollections().toArray()
    
    return NextResponse.json({ 
      status: "Connected successfully!", 
      collections: collections.map(col => col.name)
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ 
      status: "Failed to connect", 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 })
  }
}

