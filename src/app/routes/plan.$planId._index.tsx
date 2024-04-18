import { Link, useLoaderData } from '@remix-run/react';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { createClient } from '~/shared/db/createClient';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const planId = params.planId;
  if (!planId) throw new Response('', { status: 404 });

  const client = createClient();
  const result = await client.from('participant').select('*').eq('plan_id', planId);
  if (result.error) {
    console.log(result.error);
    throw new Response('', { status: 404 });
  }
  return json(result.data);
};

export default function PlanDetail() {
  const participants = useLoaderData<typeof loader>();

  const handleClickCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => alert('복사되었습니다!'));
  };

  return (
    <>
      <div className={'grid'}>
        <button onClick={handleClickCopy}>방 링크 복사</button>
        <Link to={'survey'}>
          <button>내 시간 입력</button>
        </Link>
      </div>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>
            <p>{participant.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
