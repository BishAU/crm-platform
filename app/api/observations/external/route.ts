import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

// CORS headers for external access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};


export async function POST(req: NextRequest) {
  
  const config = {
    api: {
      bodyParser: false
    }
  };

  try {
    const formData = await req.formData();
    
    // Extract basic fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const type = formData.get('type') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const observedAt = formData.get('observedAt') as string;

    // Validate required fields
    if (!title || !description || !type || !name || !email || !observedAt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    // Handle file uploads
    const images = formData.getAll('images') as File[];
    const video = formData.get('video') as File | null;

    // Process images (in a real app, you'd upload these to a storage service)
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        // For now, we'll just store the file names
        // In production, implement proper file storage
        return `/uploads/${image.name}`;
      })
    );

    let videoUrl = null;
    if (video) {
      // For now, just store the file name
      // In production, implement proper video storage
      videoUrl = `/uploads/${video.name}`;
    }

    // Parse the observed date
    const observedAtDate = new Date(observedAt);
    if (isNaN(observedAtDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid observation date' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Create observation in database
    const observation = await prisma.observation.create({
      data: {
        title,
        description,
        type,
        contact_name: name,
        contact_email: email,
        contact_phone: phone || undefined,
        media_images: imageUrls,
        media_video: videoUrl,
        status: 'pending',
        source: 'external',
        observedAt: observedAtDate
      }
    });

    return NextResponse.json(
      { 
        message: 'Observation created successfully', 
        id: observation.id 
      },
      { 
        status: 201,
        headers: corsHeaders
      }
    );
  } catch (error) {
    console.error('Error creating observation:', error);
    return NextResponse.json(
      { error: 'Failed to create observation' },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
}