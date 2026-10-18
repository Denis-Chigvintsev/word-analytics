import { rxjs_chars } from '../store/rxjs_chars';
import { rxjs_words } from '../store/rxjs_words';
import { useState, useEffect } from 'react';

function Stats() {
  return (
    <section className='stats'>
      <Stat number={0} downward={false} label='Words' />
      <Stat number={0} downward={false} label='Characters' />
      <Stat number={280} downward={true} label='Instagram' />
      <Stat number={2200} downward={true} label='Facebook' />
    </section>
  );
}

export default Stats;

function Stat({ number, downward, label }) {
  console.log(typeof number, label);
  const [charCount, setCharCount] = useState(number);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (downward == false)
      rxjs_chars.getStoreChars().subscribe((count) => {
        setCharCount(count);
      });
    if (downward == true)
      rxjs_chars.getStoreChars().subscribe((count) => {
        setCharCount(number - count);
      });

    rxjs_words.getStoreWords().subscribe((count) => {
      setWordCount(count);
    });
  });

  return (
    <section className='stat'>
      {label == 'Words' ? (
        <span className={`stat__number`}>{wordCount}</span>
      ) : (
        <span
          className={`stat__number ${charCount < 0 ? 'stat__number--limit' : ''} `}
        >
          {charCount}
        </span>
      )}

      <h2 className='second-headings'>{label}</h2>
    </section>
  );
}
