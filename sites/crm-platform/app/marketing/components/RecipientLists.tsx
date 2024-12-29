import React from 'react';
import { Card } from '../../../components/ui/Card';

interface Recipient {
  id: string;
  email: string;
  name: string;
}

interface RecipientListsProps {
  recipients: Recipient[];
}

export default function RecipientLists({ recipients }: RecipientListsProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Recipients</Card.Title>
        <Card.Description>
          {recipients.length} recipients in this list
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {recipients.map((recipient) => (
            <div
              key={recipient.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">{recipient.name}</p>
                <p className="text-sm text-gray-600">{recipient.email}</p>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
