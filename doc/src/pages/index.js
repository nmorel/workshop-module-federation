import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageAboutUs from '@site/src/components/HomepageAboutUs'

import styles from './index.module.css'

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/prerequisites">
            Démarrer le workshop
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext()
  return (
    <Layout
      title={siteConfig.title}
      description="Comment construire une application Micro-Frontend à l'aide de Module Federation"
    >
      <HomepageHeader />
      <main>
        <HomepageAboutUs />
      </main>
    </Layout>
  )
}
