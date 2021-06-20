
export function MiniBoard({board}) {
    let isFav=''
    if(board.isFavorite) isFav='favBoard'
    return (
            <section style={{ backgroundImage: board.style ? "url(" + board.style + ")" : 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2286x1600/24baa6609b89fb8eb0cc0aceb70eaf36/photo-1557682250-33bd709cbe85.jpg' }} className={`miniBoard flex center content-center ${isFav}`}>
                <h1 className={`title-miniBoard main-color fam-1 font-1 `}>{board.title}</h1>
            </section>
    )
}

