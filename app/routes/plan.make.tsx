import { ActionFunctionArgs, MetaFunction, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { createClient } from '~/shared/db/createClient';

export const meta: MetaFunction = () => {
  return [{ title: '약속 만들기' }, { name: 'description', content: '약속을 만들어보세요!' }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const supabase = createClient();
  const { data: plans } = await supabase.from('plan').insert([values]).select();

  const planId = plans?.[0]?.id;

  return redirect(`/plan/${planId}`);
};

export default function PlanMake() {
  return (
    <Form method={'post'}>
      <h1>일정 투표 만들기</h1>
      <label>
        약속 이름
        <input type="text" name="title" defaultValue={'약속 이름'} />
      </label>
      <fieldset role={'group'}>
        <legend>투표 가능한 날짜 범위 선택</legend>
        <input type="date" name="start_date" defaultValue={'2024-04-18'} />
        <input type="date" name="end_date" defaultValue={'2024-05-18'} />
      </fieldset>
      <input type="submit" value={'약속 만들기'} />
    </Form>
  );
}
