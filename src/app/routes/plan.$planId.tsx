import { json, LoaderFunctionArgs } from '@remix-run/node';
import { createClient } from '~/shared/db/createClient';
import { Outlet, useLoaderData } from '@remix-run/react';
import { Plan } from '~/shared/types/plan';
import dayjs from 'dayjs';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const planId = Number(params.planId);
  if (!planId) throw new Response('', { status: 404 });

  const client = createClient();
  const result = await client.from('plan').select('*').eq('id', planId);
  if (!result.data?.[0]) {
    throw new Response('', { status: 404 });
  }

  return json(result.data[0]);
};

export default function PlanComplete() {
  const data: Plan = useLoaderData<typeof loader>();

  return (
    <>
      <h1>{data.title}</h1>
      <p>
        {dayjs(data.start_date).format('YYYY년 M월 D일')} ~ {dayjs(data.end_date).format('YYYY년 M월 D일')}
      </p>
      <Outlet context={data} />
    </>
  );
}
