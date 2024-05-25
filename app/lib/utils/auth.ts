import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export const Auth = ( req: NextApiRequest, res: NextApiResponse ) => {
  const session = getSession(req, res);
  console.log(session)
//   if (!session?.user['http://your-namespace/roles'].includes('admin')) {
//     return { props: { error: 'Forbidden' } }
//   }
}
