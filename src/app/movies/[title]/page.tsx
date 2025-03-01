interface MoviePageProps {
    params: { title: string };
  }
  
  export default function MoviePage({ params }: MoviePageProps) {
    
    return (
      <div>
        <h1>Movie: {decodeURIComponent(params.title)}</h1>
      </div>
    );
  }