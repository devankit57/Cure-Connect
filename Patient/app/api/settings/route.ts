import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
    
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("appointmentsDB")
    
    const settings = await db.collection("settings").findOne({})

    if (!settings) {
      return NextResponse.json({ error: 'Settings not found' }, { status: 404 })
    }

    return NextResponse.json(settings)
  } catch (e) {
    console.error('Error fetching settings:', e)
    return NextResponse.json({ 
      error: 'Failed to fetch settings',
      details: e instanceof Error ? e.message : "Unknown error" 
    }, { status: 500 })
  }
}

