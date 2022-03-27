import Link from "next/link"
import styles from './styles.module.scss';

function Title(props){
    return(
        <h1>{props.children}</h1>
    )
}

export default function Home(){
    return(
        <div>
            <div className={styles.pageInicial}>
                <Title>Página sobre</Title>
            </div>
            {/* <Link href="/"> */}
            <a href="/">
                Link pro login
            </a>
            {/* </Link> */}
        </div>
    )
}