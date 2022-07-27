import { useStore } from 'effector-react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { SearchBar } from '../'
import { $loading } from '../../src/store/loading'
import { $menuOn } from '../../src/store/menuOn'
import {
    $modalDashboard,
    $modalNewSsi,
    $modalTx,
    $modalGetStarted,
    $modalBuyNft,
    $modalAddFunds,
    $modalWithdrawal,
    $modalNewMotions,
    $showSearchBar,
    updateShowSearchBar,
    $modalInvestor,
    updateModalGetStarted,
} from '../../src/store/modal'
import { updateOriginatorAddress } from '../../src/store/originatorAddress'
import styles from './styles.module.scss'

function Header() {
    const Router = useRouter()
    const { t } = useTranslation('common')
    const url = window.location.pathname.toLowerCase()
    const menuOn = useStore($menuOn)
    const modalDashboard = useStore($modalDashboard)
    const modalNewSsi = useStore($modalNewSsi)
    const modalTx = useStore($modalTx)
    const modalGetStarted = useStore($modalGetStarted)
    const modalBuyNft = useStore($modalBuyNft)
    const modalAddFunds = useStore($modalAddFunds)
    const modalWithdrawal = useStore($modalWithdrawal)
    const modalNewMotions = useStore($modalNewMotions)
    const modalInvestor = useStore($modalInvestor)
    const showSearchBar = useStore($showSearchBar)
    const loading = useStore($loading)
    const [headerClassName, setHeaderClassName] = useState('first-load')
    const [contentClassName, setContentClassName] = useState('first-load')
    const [innerClassName, setInnerClassName] = useState('first-load')
    let path: string
    if (
        (url.includes('es') ||
            url.includes('cn') ||
            url.includes('id') ||
            url.includes('ru')) &&
        url.split('/').length === 2
    ) {
        path = url
            .replace('es', '')
            .replace('cn', '')
            .replace('id', '')
            .replace('ru', '')
    } else {
        path = url
            .replace('/es', '')
            .replace('/cn', '')
            .replace('/id', '')
            .replace('/ru', '')
    }
    const searchBarMargin = path === '/' ? '-10%' : '15%'

    useEffect(() => {
        if (url == '/') {
            setTimeout(() => {
                setHeaderClassName('header')
                setContentClassName('content')
                setInnerClassName('inner')
            }, 10)
        }
        let path: string
        if (
            (url.includes('es') ||
                url.includes('cn') ||
                url.includes('id') ||
                url.includes('ru')) &&
            url.split('/').length === 2
        ) {
            path = url
                .replace('es', '')
                .replace('cn', '')
                .replace('id', '')
                .replace('ru', '')
        } else {
            path = url
                .replace('/es', '')
                .replace('/cn', '')
                .replace('/id', '')
                .replace('/ru', '')
        }
        const first = path.split('/')[1]
        let username = first
        let domain = ''
        if (first.includes('.')) {
            username = first.split('.')[0]
            domain = first.split('.')[1]
        }
        if (first === 'getstarted') {
            Router.push('/')
            setTimeout(() => {
                updateModalGetStarted(true)
            }, 1000)
        } else if (username !== '') {
            if (domain !== '' && !loading && !showSearchBar) {
                //getResults(username, domain) //@todo-i fix
            }
        }
        const third = path.split('/')[3]
        const fourth = path.split('/')[4]
        if (third === 'funds' || fourth === 'balances') {
            toast.warning(
                t('For your security, make sure you’re at tyron.network'),
                {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    toastId: 3,
                }
            )
            updateOriginatorAddress(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <ToastContainer
                className={styles.containerToast}
                closeButton={false}
                progressStyle={{ backgroundColor: '#eeeeee' }}
            />
            {url === '/' ? (
                <div id={headerClassName}>
                    <div
                        style={{ marginTop: searchBarMargin, width: '100%' }}
                        className={contentClassName}
                    >
                        {!menuOn &&
                            !modalTx &&
                            !modalGetStarted &&
                            !modalNewSsi &&
                            !modalBuyNft &&
                            !modalAddFunds &&
                            !modalWithdrawal &&
                            !modalNewMotions &&
                            !modalInvestor &&
                            !modalDashboard && (
                                <div className={innerClassName}>
                                    <SearchBar />
                                </div>
                            )}
                    </div>
                </div>
            ) : (
                <div>
                    {!menuOn &&
                        !modalTx &&
                        !modalGetStarted &&
                        !modalNewSsi &&
                        !modalBuyNft &&
                        !modalAddFunds &&
                        !modalWithdrawal &&
                        !modalNewMotions &&
                        !modalDashboard &&
                        !modalInvestor &&
                        !loading && (
                            <>
                                {showSearchBar ? (
                                    <div id={headerClassName}>
                                        <div
                                            style={{
                                                marginTop: searchBarMargin,
                                                width: '100%',
                                            }}
                                            className={contentClassName}
                                        >
                                            {!menuOn &&
                                                !modalTx &&
                                                !modalGetStarted &&
                                                !modalNewSsi &&
                                                !modalBuyNft &&
                                                !modalAddFunds &&
                                                !modalWithdrawal &&
                                                !modalNewMotions &&
                                                !modalDashboard && (
                                                    <div
                                                        className={
                                                            innerClassName
                                                        }
                                                    >
                                                        <SearchBar />
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            onClick={() => {
                                                setHeaderClassName('first-load')
                                                setContentClassName(
                                                    'first-load'
                                                )
                                                setInnerClassName('first-load')
                                                updateShowSearchBar(true)
                                                setTimeout(() => {
                                                    setHeaderClassName('header')
                                                    setContentClassName(
                                                        'content'
                                                    )
                                                    setInnerClassName('inner')
                                                }, 10)
                                            }}
                                            className={styles.searchBarIco}
                                        >
                                            <div className="button">
                                                <i className="fa fa-search"></i>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                </div>
            )}
        </>
    )
}

export default Header
