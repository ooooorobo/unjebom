import { Form, useOutletContext } from '@remix-run/react';
import { Plan } from '~/shared/types/plan';
import dayjs from 'dayjs';
import { createClient } from '~/shared/db/createClient';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { Participant } from '~/shared/types/participant';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const planId = params.planId;

  const formData = await request.formData();
  const values = Object.entries(Object.fromEntries(formData)).reduce((acc, [key, value]) => {
    if (key !== 'schedules') {
      // @ts-ignore
      acc[key] = value;
      return acc;
    }
    const schedule = JSON.stringify({ date: value });
    if (acc['schedules']) acc['schedules'].push(schedule);
    else acc['schedules'] = [schedule];
    return acc;
  }, {} as Partial<Participant>);
  values.plan_id = Number(planId);

  if (!values.plan_id || !values.name) return;

  const supabase = createClient();
  // @ts-ignore
  const data = await supabase.from('participant').insert([values]).select();

  const participantId = data.data?.[0]?.id;

  return redirect(`/plan/${planId}?participantId=${participantId}`);
};

export default function PlanComplete() {
  const plan = useOutletContext<Plan>();

  const startDateToNumber = dayjs(plan.start_date).valueOf();
  const endDateToNumber = dayjs(plan.end_date).valueOf();

  return (
    <Form method={'post'}>
      <legend>내 시간 입력</legend>
      <fieldset className={'grid'}>
        <label>
          이름
          <input type="text" name={'name'} placeholder={'이름'} autoComplete={'username'} required={true} />
        </label>
        <label>
          (선택) 비밀번호
          <input type="password" name={'password'} placeholder={'(선택) 비밀번호'} autoComplete={'current-password'} />
        </label>
      </fieldset>
      <label>
        가능한 날짜 선택
        <input type={'date'} name={'schedules'} required={true} min={startDateToNumber} max={endDateToNumber} defaultValue={'2024-04-20'} />
      </label>
      <input type="submit" value={'제출하기'} />
    </Form>
  );
}
