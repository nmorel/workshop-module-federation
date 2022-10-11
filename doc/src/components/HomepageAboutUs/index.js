import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

const KlaxoonSvg = require('@site/static/img/klaxoon_white.svg').default

const AuthorList = [
  {
    name: 'Nicolas Morel',
    photo: null,
    description: 'Youyouyoyu',
  },
  {
    name: 'Alban Depretz',
    photo: null,
    description: 'Blablalalaala',
  },
]

function Author({name, photo, description}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center">
        {photo ? (
          <img className={styles.authorPhoto} src={photo} alt={name} />
        ) : (
          <div className={styles.authorPhoto} />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageAboutUs() {
  return (
    <section className={styles.authors}>
      <div className="container">
        <div className="row">
          {AuthorList.map((props, idx) => (
            <Author key={idx} {...props} />
          ))}
        </div>
        <div className="row">
          <div className={clsx('col col--12')}>
            <div className="text--center margin-top--xl padding-horiz--lg">
              <KlaxoonSvg className={styles.klaxoonLogo} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
