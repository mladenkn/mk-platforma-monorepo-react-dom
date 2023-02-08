import { eva } from '@mk-libs/common/common'

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
       {eva(() => 'hello fro eva')}
    </div>
  );
}
