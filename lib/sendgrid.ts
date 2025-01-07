import client from '@sendgrid/client';
import mail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  client.setApiKey(process.env.SENDGRID_API_KEY);
  mail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function getEmailStats(startDate: string, endDate: string) {
  try {
    const [response] = await client.request({
      method: 'GET',
      url: '/v3/stats',
      qs: {
        start_date: startDate,
        end_date: endDate,
        aggregated_by: 'day',
      },
    });
    return response.body;
  } catch (error) {
    console.error('Error fetching email stats:', error);
    return null;
  }
}

export async function getClickThroughRates(startDate: string, endDate: string) {
  try {
    const [response] = await client.request({
      method: 'GET',
      url: '/v3/stats',
      qs: {
        start_date: startDate,
        end_date: endDate,
        aggregated_by: 'day',
        metrics: 'clicks,opens',
      },
    });
    return response.body;
  } catch (error) {
    console.error('Error fetching click-through rates:', error);
    return null;
  }
}

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL || '',
      subject,
      html,
    };
    await mail.send(msg);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function listDesigns() {
  try {
    const [response] = await client.request({
      method: 'GET',
      url: '/v3/designs',
    });
    return response.body;
  } catch (error) {
    console.error('Error fetching designs:', error);
    return null;
  }
}
