import { Link } from '@remix-run/react';

export default function Index() {
  return (
    <ul>
      <li>
        <Link to={'/plan/make'}>약속 만들기</Link>
      </li>
    </ul>
  );
}
