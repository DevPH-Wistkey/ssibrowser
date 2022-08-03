import Layout from '../../../components/Layout'
import { DIDxWallet, Headline } from '../../../components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPaths } from 'next/types'
import React from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'
import zilIco from '../../../src/assets/icons/zil.svg'
import usdIco from '../../../src/assets/icons/usd.svg'
import arrowDownIco from '../../../src/assets/icons/arrow_down_white.svg'
import swapIco from '../../../src/assets/icons/swap_defi.svg'

function Header() {
    const data = []

    return (
        <>
            <Layout>
                {/* <div style={{ width: '100%', marginTop: '10%' }}>
                    <Headline data={data} />
                </div> */}
                <div>
                    <div>
                        <div className={styles.headerInput}>
                            <div className={styles.inputTitle}>FROM</div>
                            <div className={styles.txtBal}>
                                • BALANCE : 5456.54
                            </div>
                        </div>
                        <div className={styles.inputWrapper}>
                            <input className={styles.input} />
                            <div className={styles.dropdownWrapper}>
                                <Image width={17} height={17} src={zilIco} />
                                <div>ZIL</div>
                                <Image src={arrowDownIco} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.swap}>
                        <Image width={50} height={50} src={swapIco} />
                    </div>
                    <div>
                        <div className={styles.headerInput}>
                            <div className={styles.inputTitle}>TO</div>
                        </div>
                        <div className={styles.inputWrapper}>
                            <input className={styles.input} />
                            <div className={styles.dropdownWrapper}>
                                <Image width={17} height={17} src={usdIco} />
                                <div>USD</div>
                                <Image src={arrowDownIco} />
                            </div>
                        </div>
                        <div className={styles.toFooter}>
                            <div className={styles.txtBal}>
                                • BALANCE : 5456.54
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.txtZil}>
                            1 ZIL = 3.056004512922 USD
                        </div>
                        <div className={styles.txtZil}>|</div>
                        <div className={styles.wrapperEst}>
                            <div className={styles.txtFee}>
                                ESTIMATED FEE = 0.56403 USD
                            </div>
                            <div className={styles.ask}>?</div>
                        </div>
                    </div>
                    <div className={styles.btn}>EXCHANGE</div>
                </div>
            </Layout>
        </>
    )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
})

export default Header
