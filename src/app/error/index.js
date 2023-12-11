import {memo} from 'react';
function Error() {

  return (
    <div className={'Error'}>
      По данной ссылке нет страницы, попробуйте вернуться на предидущую.
    </div>
  );
}

export default memo(Error);