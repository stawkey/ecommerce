import numpy as np
from scipy.integrate import quad
import math
import matplotlib.pyplot as plt

LENGTH_OF_OMEGA = 3


def rho(x):
    if 0 <= x <= 1 or 2 < x <= 3:
        return -10
    elif 1 < x <= 2:
        return 1
    else:
        return 0


def e(k, n, x):
    return max(0, 1 - abs(x / (LENGTH_OF_OMEGA / n) - k))


def derivative_of_e(k, n, x):
    h = LENGTH_OF_OMEGA / n  # omega=(0,l), h=l/n
    if h * (k - 1) < x < h * k:
        return 1 / h
    if h * k < x < h * (k + 1):
        return -1 / h
    return 0


# wypelnienie macierzy b
def matrix_b(n):
    b = np.zeros((n, n))
    h = LENGTH_OF_OMEGA / n
    for i in range(0, n):
        for j in range(0, n):
            # nie licze calek poza piramidkami
            lower_bound = max(0, h * (i - 1), h * (j - 1))
            upper_bound = min(LENGTH_OF_OMEGA, h * (i + 1), h * (j + 1))

            # if lower_bound < upper_bound:
            integrand = lambda x: derivative_of_e(i, n, x) * derivative_of_e(j, n, x)
            b[i, j] = -quad(integrand, lower_bound, upper_bound)[0]
    return b


# wypelnienie macierzy l
def matrix_l(n):
    l = np.zeros((n))
    h = LENGTH_OF_OMEGA / n
    for i in range(0, n):
        lower_bound = h * (i - 1)
        upper_bound = h * (i + 1)
        integrand = lambda x: rho(x) * e(i, n, x)
        l[i] = 4 * math.pi * quad(integrand, lower_bound, upper_bound)[0] + 70 * e(
            i, n, 0
        )
    return l


def plot(solution, n):
    x = np.linspace(0, LENGTH_OF_OMEGA, n + 1)
    y = np.concatenate((solution, [0]))

    plt.plot(x, y + 10)
    plt.title("Potencjał grawitacyjny")
    plt.xlabel("x")
    plt.ylabel("Φ(x)")
    plt.grid(True)
    plt.show()


if __name__ == "__main__":
    n = int(input("N: "))

    b = matrix_b(n)
    l = matrix_l(n)

    plot(np.linalg.solve(b, l), n)
