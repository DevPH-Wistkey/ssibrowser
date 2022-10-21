import { useStore } from 'effector-react'
import { $resolvedInfo } from '../../../src/store/resolvedInfo'
import styles from './styles.module.scss'
import { useTranslation } from 'next-i18next'
import routerHook from '../../../src/hooks/router'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { $loading } from '../../../src/store/loading'
import { ClaimWallet, Spinner } from '../..'
import fetch from '../../../src/hooks/fetch'
import controller from '../../../src/hooks/isController'
import { $isController } from '../../../src/store/controller'
import toastTheme from '../../../src/hooks/toastTheme'
import { useSelector } from 'react-redux'
import { RootState } from '../../../src/app/reducers'
import wallet from '../../../src/hooks/wallet'

function Component() {
    const { t } = useTranslation()
    const { navigate } = routerHook()
    const { fetchDoc } = fetch()
    const { checkPause } = wallet()
    const isLight = useSelector((state: RootState) => state.modal.isLight)
    const loading = useStore($loading)
    const { isController } = controller()
    const resolvedInfo = useStore($resolvedInfo)
    const username = resolvedInfo?.name
    const domain = resolvedInfo?.domain
    const domainNavigate = domain !== '' ? domain + '@' : ''
    const [isPaused, setIsPaused] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const fetchPause = async () => {
        setIsLoading(true)
        try {
            const paused = await checkPause()
            setIsPaused(paused)
            setIsLoading(false)
            fetchDoc()
        } catch {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        isController()
        fetchPause()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading || isLoading) {
        return <Spinner />
    }

    return (
        <div className={styles.wrapper}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '10%',
                }}
            >
                <div
                    style={{
                        textAlign: 'left',
                        marginTop: '10%',
                    }}
                >
                    <div className={styles.cardHeadline}>
                        <h3 style={{ color: '#dbe4eb', textTransform: 'none' }}>
                            ZIL Staking xWallet{' '}
                        </h3>{' '}
                    </div>
                    <h1>
                        <p className={styles.username}>
                            <span>{domain}@</span>
                            <span>{username}.did</span>
                        </p>{' '}
                    </h1>
                </div>
            </div>
            <div
                style={{
                    marginTop: '3%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <h2>
                        <div
                            onClick={() => {
                                if (isPaused) {
                                    toast.warn(
                                        'To continue, unpause your ZILxWALLET',
                                        {
                                            position: 'top-right',
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: toastTheme(isLight),
                                            toastId: 1,
                                        }
                                    )
                                } else {
                                    navigate(
                                        `/${domainNavigate}${resolvedInfo?.name}/zil/funds`
                                    )
                                }
                            }}
                            className={styles.flipCard}
                        >
                            <div className={styles.flipCardInner}>
                                <div className={styles.flipCardFront}>
                                    <p className={styles.cardTitle3}>ZIL</p>
                                </div>
                                <div className={styles.flipCardBack}>
                                    <p className={styles.cardTitle2}>
                                        {t('TOP UP WALLET')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </h2>
                    <div className={styles.xText}>
                        <h5 style={{ color: isLight ? '#000' : '#dbe4eb' }}>
                            x
                        </h5>
                    </div>
                    <h2>
                        <div
                            onClick={() => {
                                isController()
                                const is_controller = $isController.getState()
                                if (is_controller) {
                                    navigate(
                                        `/${domainNavigate}${resolvedInfo?.name}/zil/wallet`
                                    )
                                } else {
                                    toast.error(
                                        t(
                                            'Only X’s DID Controller can access this wallet.',
                                            { name: resolvedInfo?.name }
                                        ),
                                        {
                                            position: 'bottom-right',
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: toastTheme(isLight),
                                            toastId: 1,
                                        }
                                    )
                                }
                            }}
                            className={styles.flipCard}
                        >
                            <div className={styles.flipCardInner}>
                                <div className={styles.flipCardFront}>
                                    <p className={styles.cardTitle3}>
                                        {t('WALLET')}
                                    </p>
                                </div>
                                <div className={styles.flipCardBack}>
                                    <p className={styles.cardTitle2}>
                                        {t('WEB3 WALLET')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className={styles.selectionWrapper}>
                        <ClaimWallet title="CLAIM ZILxWallet" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Component
