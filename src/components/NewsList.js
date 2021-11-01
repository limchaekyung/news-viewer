import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px){
        width: 100%;
        padding-left: 1rem;
        pading-right: 1rem;
    }
`;

const NewsList = ({category}) => {
    const [articles, setarticles] = useState(null);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        //async를 사용하는 함수 따로 선언
        const fetchData = async () => {
            setloading(true);
            try{
                const query = category === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=49d2de740ca642159e2fe1515ce06a19`,
                );
                setarticles(response.data.articles);
            }catch(e){
                console.log(e);
            }
            setloading(false);
        }
        fetchData();
    }, [category]);

    //대기 중일 때
    if(loading){
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }

    //아직 articles 값이 설정되지 않았을 때
    if(!articles){
        return null;
    }

    //article 값이 유효할  때
    return(
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    )
}

export default NewsList;