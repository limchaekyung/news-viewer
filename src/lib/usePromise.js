import {useState, useEffect} from 'react';

export default function usePromise(promiseCreator, deps){
    //대기 중/완료/실패에 대한 상태 관리
    const [loading, setloading] = useState(false);
    const [resolved, setresolved] = useState(null);
    const [error, seterror] = useState(null);

    useEffect(() => {
        const process = async () => {
            setloading(true);
            try{
                const resolved = await promiseCreator();
                setresolved(resolved);
            }catch(e){
                seterror(e);
            }
            setloading(false);
        };
        process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return [loading, resolved, error];
}
