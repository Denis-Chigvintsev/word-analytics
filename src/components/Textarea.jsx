/* eslint-disable no-unused-vars */
import { fromEvent, map } from 'rxjs';
import { useEffect, useState } from 'react';
import { rxjs_words } from '../store/rxjs_words';
import { rxjs_chars } from '../store/rxjs_chars';

import Warning from './Warning';
let text;

function Textarea() {
  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState('');

  const Manipulation = () => {
    if (warning == false) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 3000);
    }
    if (warning == true) {
      setWarning(false);
      setWarning(true);
      {
        setTimeout(() => {
          setWarning(false);
        }, 3000);
      }
    }
  };
  useEffect(() => {
    const inp = document.querySelector('.id1');
    let textStream$ = fromEvent(inp, 'keyup')
      .pipe(
        map((e) => e.currentTarget.value),
        map((e) => {
          if (e.includes('<script>')) {
            const newText = e.replace('<script>', '');
            Manipulation();
            inp.value = newText;
            setWarningText((prev) => 'no script tag allowed');
          }
          if (e.includes('@')) {
            const newText = e.replace('@', '');
            Manipulation();
            inp.value = newText;
            setWarningText((prev) => 'no @ symbol allowed');
          }
          return e;
        }),
      )
      .subscribe((data) => {
        let charCount = data.length;
        let wordCount;
        let trimmedStr = data.trim();
        if (trimmedStr == '') {
          wordCount = 0;
        } else {
          wordCount = trimmedStr.split(/\s+/).length;
        }
        rxjs_words.setStoreWords(wordCount);
        rxjs_chars.setStoreChars(charCount);
      });
    return () => textStream$.unsubscribe();
  });

  return (
    <div className='textarea'>
      <textarea
        className='id1'
        placeholder='Enter your text'
        spellCheck='false'
      />
      {warning == true && <Warning warningText={warningText} />}
    </div>
  );
}

export default Textarea;
