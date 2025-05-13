
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AppUser
 * 
 */
export type AppUser = $Result.DefaultSelection<Prisma.$AppUserPayload>
/**
 * Model ApiKey
 * 
 */
export type ApiKey = $Result.DefaultSelection<Prisma.$ApiKeyPayload>
/**
 * Model AppSession
 * 
 */
export type AppSession = $Result.DefaultSelection<Prisma.$AppSessionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model UserAccount
 * 
 */
export type UserAccount = $Result.DefaultSelection<Prisma.$UserAccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model AuthLog
 * 
 */
export type AuthLog = $Result.DefaultSelection<Prisma.$AuthLogPayload>
/**
 * Model EmailVerification
 * 
 */
export type EmailVerification = $Result.DefaultSelection<Prisma.$EmailVerificationPayload>
/**
 * Model PasswordReset
 * 
 */
export type PasswordReset = $Result.DefaultSelection<Prisma.$PasswordResetPayload>
/**
 * Model AuthEvent
 * 
 */
export type AuthEvent = $Result.DefaultSelection<Prisma.$AuthEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AuthEventType: {
  REGISTER: 'REGISTER',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST',
  PASSWORD_RESET: 'PASSWORD_RESET',
  EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
  TOKEN_REFRESH: 'TOKEN_REFRESH',
  ACCOUNT_LOCK: 'ACCOUNT_LOCK',
  ACCOUNT_UNLOCK: 'ACCOUNT_UNLOCK'
};

export type AuthEventType = (typeof AuthEventType)[keyof typeof AuthEventType]


export const AuthEventStatus: {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};

export type AuthEventStatus = (typeof AuthEventStatus)[keyof typeof AuthEventStatus]

}

export type AuthEventType = $Enums.AuthEventType

export const AuthEventType: typeof $Enums.AuthEventType

export type AuthEventStatus = $Enums.AuthEventStatus

export const AuthEventStatus: typeof $Enums.AuthEventStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AppUsers
 * const appUsers = await prisma.appUser.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AppUsers
   * const appUsers = await prisma.appUser.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.appUser`: Exposes CRUD operations for the **AppUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppUsers
    * const appUsers = await prisma.appUser.findMany()
    * ```
    */
  get appUser(): Prisma.AppUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiKey`: Exposes CRUD operations for the **ApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeys
    * const apiKeys = await prisma.apiKey.findMany()
    * ```
    */
  get apiKey(): Prisma.ApiKeyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appSession`: Exposes CRUD operations for the **AppSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppSessions
    * const appSessions = await prisma.appSession.findMany()
    * ```
    */
  get appSession(): Prisma.AppSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userAccount`: Exposes CRUD operations for the **UserAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAccounts
    * const userAccounts = await prisma.userAccount.findMany()
    * ```
    */
  get userAccount(): Prisma.UserAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authLog`: Exposes CRUD operations for the **AuthLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthLogs
    * const authLogs = await prisma.authLog.findMany()
    * ```
    */
  get authLog(): Prisma.AuthLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailVerification`: Exposes CRUD operations for the **EmailVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailVerifications
    * const emailVerifications = await prisma.emailVerification.findMany()
    * ```
    */
  get emailVerification(): Prisma.EmailVerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordReset`: Exposes CRUD operations for the **PasswordReset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResets
    * const passwordResets = await prisma.passwordReset.findMany()
    * ```
    */
  get passwordReset(): Prisma.PasswordResetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authEvent`: Exposes CRUD operations for the **AuthEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthEvents
    * const authEvents = await prisma.authEvent.findMany()
    * ```
    */
  get authEvent(): Prisma.AuthEventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AppUser: 'AppUser',
    ApiKey: 'ApiKey',
    AppSession: 'AppSession',
    User: 'User',
    Account: 'Account',
    UserAccount: 'UserAccount',
    Session: 'Session',
    AuthLog: 'AuthLog',
    EmailVerification: 'EmailVerification',
    PasswordReset: 'PasswordReset',
    AuthEvent: 'AuthEvent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "appUser" | "apiKey" | "appSession" | "user" | "account" | "userAccount" | "session" | "authLog" | "emailVerification" | "passwordReset" | "authEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AppUser: {
        payload: Prisma.$AppUserPayload<ExtArgs>
        fields: Prisma.AppUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>
          }
          findFirst: {
            args: Prisma.AppUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>
          }
          findMany: {
            args: Prisma.AppUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>[]
          }
          create: {
            args: Prisma.AppUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>
          }
          createMany: {
            args: Prisma.AppUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AppUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>
          }
          update: {
            args: Prisma.AppUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>
          }
          deleteMany: {
            args: Prisma.AppUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppUserPayload>
          }
          aggregate: {
            args: Prisma.AppUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppUser>
          }
          groupBy: {
            args: Prisma.AppUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppUserCountArgs<ExtArgs>
            result: $Utils.Optional<AppUserCountAggregateOutputType> | number
          }
        }
      }
      ApiKey: {
        payload: Prisma.$ApiKeyPayload<ExtArgs>
        fields: Prisma.ApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findFirst: {
            args: Prisma.ApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findMany: {
            args: Prisma.ApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          create: {
            args: Prisma.ApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          createMany: {
            args: Prisma.ApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          update: {
            args: Prisma.ApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.ApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          aggregate: {
            args: Prisma.ApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiKey>
          }
          groupBy: {
            args: Prisma.ApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyCountAggregateOutputType> | number
          }
        }
      }
      AppSession: {
        payload: Prisma.$AppSessionPayload<ExtArgs>
        fields: Prisma.AppSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>
          }
          findFirst: {
            args: Prisma.AppSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>
          }
          findMany: {
            args: Prisma.AppSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>[]
          }
          create: {
            args: Prisma.AppSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>
          }
          createMany: {
            args: Prisma.AppSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AppSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>
          }
          update: {
            args: Prisma.AppSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>
          }
          deleteMany: {
            args: Prisma.AppSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSessionPayload>
          }
          aggregate: {
            args: Prisma.AppSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppSession>
          }
          groupBy: {
            args: Prisma.AppSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppSessionCountArgs<ExtArgs>
            result: $Utils.Optional<AppSessionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      UserAccount: {
        payload: Prisma.$UserAccountPayload<ExtArgs>
        fields: Prisma.UserAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          findFirst: {
            args: Prisma.UserAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          findMany: {
            args: Prisma.UserAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>[]
          }
          create: {
            args: Prisma.UserAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          createMany: {
            args: Prisma.UserAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          update: {
            args: Prisma.UserAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          deleteMany: {
            args: Prisma.UserAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAccountPayload>
          }
          aggregate: {
            args: Prisma.UserAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAccount>
          }
          groupBy: {
            args: Prisma.UserAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAccountCountArgs<ExtArgs>
            result: $Utils.Optional<UserAccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      AuthLog: {
        payload: Prisma.$AuthLogPayload<ExtArgs>
        fields: Prisma.AuthLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLogPayload>
          }
          findFirst: {
            args: Prisma.AuthLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLogPayload>
          }
          findMany: {
            args: Prisma.AuthLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLogPayload>[]
          }
          create: {
            args: Prisma.AuthLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLogPayload>
          }
          createMany: {
            args: Prisma.AuthLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AuthLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLogPayload>
          }
          update: {
            args: Prisma.AuthLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLogPayload>
          }
          deleteMany: {
            args: Prisma.AuthLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuthLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLogPayload>
          }
          aggregate: {
            args: Prisma.AuthLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthLog>
          }
          groupBy: {
            args: Prisma.AuthLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuthLogCountAggregateOutputType> | number
          }
        }
      }
      EmailVerification: {
        payload: Prisma.$EmailVerificationPayload<ExtArgs>
        fields: Prisma.EmailVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>
          }
          findFirst: {
            args: Prisma.EmailVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>
          }
          findMany: {
            args: Prisma.EmailVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>[]
          }
          create: {
            args: Prisma.EmailVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>
          }
          createMany: {
            args: Prisma.EmailVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmailVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>
          }
          update: {
            args: Prisma.EmailVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>
          }
          deleteMany: {
            args: Prisma.EmailVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmailVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailVerificationPayload>
          }
          aggregate: {
            args: Prisma.EmailVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailVerification>
          }
          groupBy: {
            args: Prisma.EmailVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<EmailVerificationCountAggregateOutputType> | number
          }
        }
      }
      PasswordReset: {
        payload: Prisma.$PasswordResetPayload<ExtArgs>
        fields: Prisma.PasswordResetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findMany: {
            args: Prisma.PasswordResetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          create: {
            args: Prisma.PasswordResetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          createMany: {
            args: Prisma.PasswordResetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PasswordResetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          update: {
            args: Prisma.PasswordResetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PasswordResetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordReset>
          }
          groupBy: {
            args: Prisma.PasswordResetGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetCountAggregateOutputType> | number
          }
        }
      }
      AuthEvent: {
        payload: Prisma.$AuthEventPayload<ExtArgs>
        fields: Prisma.AuthEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthEventPayload>
          }
          findFirst: {
            args: Prisma.AuthEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthEventPayload>
          }
          findMany: {
            args: Prisma.AuthEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthEventPayload>[]
          }
          create: {
            args: Prisma.AuthEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthEventPayload>
          }
          createMany: {
            args: Prisma.AuthEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AuthEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthEventPayload>
          }
          update: {
            args: Prisma.AuthEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthEventPayload>
          }
          deleteMany: {
            args: Prisma.AuthEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuthEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthEventPayload>
          }
          aggregate: {
            args: Prisma.AuthEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthEvent>
          }
          groupBy: {
            args: Prisma.AuthEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthEventCountArgs<ExtArgs>
            result: $Utils.Optional<AuthEventCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    appUser?: AppUserOmit
    apiKey?: ApiKeyOmit
    appSession?: AppSessionOmit
    user?: UserOmit
    account?: AccountOmit
    userAccount?: UserAccountOmit
    session?: SessionOmit
    authLog?: AuthLogOmit
    emailVerification?: EmailVerificationOmit
    passwordReset?: PasswordResetOmit
    authEvent?: AuthEventOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AppUserCountOutputType
   */

  export type AppUserCountOutputType = {
    api_keys: number
    app_sessions: number
    auth_events: number
  }

  export type AppUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    api_keys?: boolean | AppUserCountOutputTypeCountApi_keysArgs
    app_sessions?: boolean | AppUserCountOutputTypeCountApp_sessionsArgs
    auth_events?: boolean | AppUserCountOutputTypeCountAuth_eventsArgs
  }

  // Custom InputTypes
  /**
   * AppUserCountOutputType without action
   */
  export type AppUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUserCountOutputType
     */
    select?: AppUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AppUserCountOutputType without action
   */
  export type AppUserCountOutputTypeCountApi_keysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
  }

  /**
   * AppUserCountOutputType without action
   */
  export type AppUserCountOutputTypeCountApp_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppSessionWhereInput
  }

  /**
   * AppUserCountOutputType without action
   */
  export type AppUserCountOutputTypeCountAuth_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthEventWhereInput
  }


  /**
   * Count Type ApiKeyCountOutputType
   */

  export type ApiKeyCountOutputType = {
    users: number
  }

  export type ApiKeyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | ApiKeyCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * ApiKeyCountOutputType without action
   */
  export type ApiKeyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyCountOutputType
     */
    select?: ApiKeyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ApiKeyCountOutputType without action
   */
  export type ApiKeyCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    auth_logs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    auth_logs?: boolean | UserCountOutputTypeCountAuth_logsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuth_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthLogWhereInput
  }


  /**
   * Count Type AccountCountOutputType
   */

  export type AccountCountOutputType = {
    user_accounts: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_accounts?: boolean | AccountCountOutputTypeCountUser_accountsArgs
  }

  // Custom InputTypes
  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountCountOutputType
     */
    select?: AccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountUser_accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAccountWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AppUser
   */

  export type AggregateAppUser = {
    _count: AppUserCountAggregateOutputType | null
    _min: AppUserMinAggregateOutputType | null
    _max: AppUserMaxAggregateOutputType | null
  }

  export type AppUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password_hash: string | null
    name: string | null
    company_name: string | null
    phone: string | null
    website: string | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
    email_verified: boolean | null
    email_verified_at: Date | null
    reset_token: string | null
    reset_token_expires: Date | null
  }

  export type AppUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password_hash: string | null
    name: string | null
    company_name: string | null
    phone: string | null
    website: string | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
    email_verified: boolean | null
    email_verified_at: Date | null
    reset_token: string | null
    reset_token_expires: Date | null
  }

  export type AppUserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    password_hash: number
    name: number
    company_name: number
    phone: number
    website: number
    active: number
    created_at: number
    updated_at: number
    email_verified: number
    email_verified_at: number
    reset_token: number
    reset_token_expires: number
    _all: number
  }


  export type AppUserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password_hash?: true
    name?: true
    company_name?: true
    phone?: true
    website?: true
    active?: true
    created_at?: true
    updated_at?: true
    email_verified?: true
    email_verified_at?: true
    reset_token?: true
    reset_token_expires?: true
  }

  export type AppUserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password_hash?: true
    name?: true
    company_name?: true
    phone?: true
    website?: true
    active?: true
    created_at?: true
    updated_at?: true
    email_verified?: true
    email_verified_at?: true
    reset_token?: true
    reset_token_expires?: true
  }

  export type AppUserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password_hash?: true
    name?: true
    company_name?: true
    phone?: true
    website?: true
    active?: true
    created_at?: true
    updated_at?: true
    email_verified?: true
    email_verified_at?: true
    reset_token?: true
    reset_token_expires?: true
    _all?: true
  }

  export type AppUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppUser to aggregate.
     */
    where?: AppUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppUsers to fetch.
     */
    orderBy?: AppUserOrderByWithRelationInput | AppUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppUsers
    **/
    _count?: true | AppUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppUserMaxAggregateInputType
  }

  export type GetAppUserAggregateType<T extends AppUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAppUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppUser[P]>
      : GetScalarType<T[P], AggregateAppUser[P]>
  }




  export type AppUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppUserWhereInput
    orderBy?: AppUserOrderByWithAggregationInput | AppUserOrderByWithAggregationInput[]
    by: AppUserScalarFieldEnum[] | AppUserScalarFieldEnum
    having?: AppUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppUserCountAggregateInputType | true
    _min?: AppUserMinAggregateInputType
    _max?: AppUserMaxAggregateInputType
  }

  export type AppUserGroupByOutputType = {
    id: string
    email: string
    username: string
    password_hash: string
    name: string | null
    company_name: string | null
    phone: string | null
    website: string | null
    active: boolean
    created_at: Date
    updated_at: Date
    email_verified: boolean
    email_verified_at: Date | null
    reset_token: string | null
    reset_token_expires: Date | null
    _count: AppUserCountAggregateOutputType | null
    _min: AppUserMinAggregateOutputType | null
    _max: AppUserMaxAggregateOutputType | null
  }

  type GetAppUserGroupByPayload<T extends AppUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppUserGroupByOutputType[P]>
            : GetScalarType<T[P], AppUserGroupByOutputType[P]>
        }
      >
    >


  export type AppUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password_hash?: boolean
    name?: boolean
    company_name?: boolean
    phone?: boolean
    website?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
    email_verified?: boolean
    email_verified_at?: boolean
    reset_token?: boolean
    reset_token_expires?: boolean
    api_keys?: boolean | AppUser$api_keysArgs<ExtArgs>
    app_sessions?: boolean | AppUser$app_sessionsArgs<ExtArgs>
    password_resets?: boolean | AppUser$password_resetsArgs<ExtArgs>
    auth_events?: boolean | AppUser$auth_eventsArgs<ExtArgs>
    _count?: boolean | AppUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appUser"]>



  export type AppUserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    password_hash?: boolean
    name?: boolean
    company_name?: boolean
    phone?: boolean
    website?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
    email_verified?: boolean
    email_verified_at?: boolean
    reset_token?: boolean
    reset_token_expires?: boolean
  }

  export type AppUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "password_hash" | "name" | "company_name" | "phone" | "website" | "active" | "created_at" | "updated_at" | "email_verified" | "email_verified_at" | "reset_token" | "reset_token_expires", ExtArgs["result"]["appUser"]>
  export type AppUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    api_keys?: boolean | AppUser$api_keysArgs<ExtArgs>
    app_sessions?: boolean | AppUser$app_sessionsArgs<ExtArgs>
    password_resets?: boolean | AppUser$password_resetsArgs<ExtArgs>
    auth_events?: boolean | AppUser$auth_eventsArgs<ExtArgs>
    _count?: boolean | AppUserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AppUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppUser"
    objects: {
      api_keys: Prisma.$ApiKeyPayload<ExtArgs>[]
      app_sessions: Prisma.$AppSessionPayload<ExtArgs>[]
      password_resets: Prisma.$PasswordResetPayload<ExtArgs> | null
      auth_events: Prisma.$AuthEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      username: string
      password_hash: string
      name: string | null
      company_name: string | null
      phone: string | null
      website: string | null
      active: boolean
      created_at: Date
      updated_at: Date
      email_verified: boolean
      email_verified_at: Date | null
      reset_token: string | null
      reset_token_expires: Date | null
    }, ExtArgs["result"]["appUser"]>
    composites: {}
  }

  type AppUserGetPayload<S extends boolean | null | undefined | AppUserDefaultArgs> = $Result.GetResult<Prisma.$AppUserPayload, S>

  type AppUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppUserCountAggregateInputType | true
    }

  export interface AppUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppUser'], meta: { name: 'AppUser' } }
    /**
     * Find zero or one AppUser that matches the filter.
     * @param {AppUserFindUniqueArgs} args - Arguments to find a AppUser
     * @example
     * // Get one AppUser
     * const appUser = await prisma.appUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppUserFindUniqueArgs>(args: SelectSubset<T, AppUserFindUniqueArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AppUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppUserFindUniqueOrThrowArgs} args - Arguments to find a AppUser
     * @example
     * // Get one AppUser
     * const appUser = await prisma.appUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AppUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserFindFirstArgs} args - Arguments to find a AppUser
     * @example
     * // Get one AppUser
     * const appUser = await prisma.appUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppUserFindFirstArgs>(args?: SelectSubset<T, AppUserFindFirstArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserFindFirstOrThrowArgs} args - Arguments to find a AppUser
     * @example
     * // Get one AppUser
     * const appUser = await prisma.appUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AppUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AppUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppUsers
     * const appUsers = await prisma.appUser.findMany()
     * 
     * // Get first 10 AppUsers
     * const appUsers = await prisma.appUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appUserWithIdOnly = await prisma.appUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppUserFindManyArgs>(args?: SelectSubset<T, AppUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AppUser.
     * @param {AppUserCreateArgs} args - Arguments to create a AppUser.
     * @example
     * // Create one AppUser
     * const AppUser = await prisma.appUser.create({
     *   data: {
     *     // ... data to create a AppUser
     *   }
     * })
     * 
     */
    create<T extends AppUserCreateArgs>(args: SelectSubset<T, AppUserCreateArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AppUsers.
     * @param {AppUserCreateManyArgs} args - Arguments to create many AppUsers.
     * @example
     * // Create many AppUsers
     * const appUser = await prisma.appUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppUserCreateManyArgs>(args?: SelectSubset<T, AppUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AppUser.
     * @param {AppUserDeleteArgs} args - Arguments to delete one AppUser.
     * @example
     * // Delete one AppUser
     * const AppUser = await prisma.appUser.delete({
     *   where: {
     *     // ... filter to delete one AppUser
     *   }
     * })
     * 
     */
    delete<T extends AppUserDeleteArgs>(args: SelectSubset<T, AppUserDeleteArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AppUser.
     * @param {AppUserUpdateArgs} args - Arguments to update one AppUser.
     * @example
     * // Update one AppUser
     * const appUser = await prisma.appUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppUserUpdateArgs>(args: SelectSubset<T, AppUserUpdateArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AppUsers.
     * @param {AppUserDeleteManyArgs} args - Arguments to filter AppUsers to delete.
     * @example
     * // Delete a few AppUsers
     * const { count } = await prisma.appUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppUserDeleteManyArgs>(args?: SelectSubset<T, AppUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppUsers
     * const appUser = await prisma.appUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppUserUpdateManyArgs>(args: SelectSubset<T, AppUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AppUser.
     * @param {AppUserUpsertArgs} args - Arguments to update or create a AppUser.
     * @example
     * // Update or create a AppUser
     * const appUser = await prisma.appUser.upsert({
     *   create: {
     *     // ... data to create a AppUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppUser we want to update
     *   }
     * })
     */
    upsert<T extends AppUserUpsertArgs>(args: SelectSubset<T, AppUserUpsertArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AppUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserCountArgs} args - Arguments to filter AppUsers to count.
     * @example
     * // Count the number of AppUsers
     * const count = await prisma.appUser.count({
     *   where: {
     *     // ... the filter for the AppUsers we want to count
     *   }
     * })
    **/
    count<T extends AppUserCountArgs>(
      args?: Subset<T, AppUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppUserAggregateArgs>(args: Subset<T, AppUserAggregateArgs>): Prisma.PrismaPromise<GetAppUserAggregateType<T>>

    /**
     * Group by AppUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppUserGroupByArgs['orderBy'] }
        : { orderBy?: AppUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppUser model
   */
  readonly fields: AppUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    api_keys<T extends AppUser$api_keysArgs<ExtArgs> = {}>(args?: Subset<T, AppUser$api_keysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    app_sessions<T extends AppUser$app_sessionsArgs<ExtArgs> = {}>(args?: Subset<T, AppUser$app_sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    password_resets<T extends AppUser$password_resetsArgs<ExtArgs> = {}>(args?: Subset<T, AppUser$password_resetsArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    auth_events<T extends AppUser$auth_eventsArgs<ExtArgs> = {}>(args?: Subset<T, AppUser$auth_eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppUser model
   */
  interface AppUserFieldRefs {
    readonly id: FieldRef<"AppUser", 'String'>
    readonly email: FieldRef<"AppUser", 'String'>
    readonly username: FieldRef<"AppUser", 'String'>
    readonly password_hash: FieldRef<"AppUser", 'String'>
    readonly name: FieldRef<"AppUser", 'String'>
    readonly company_name: FieldRef<"AppUser", 'String'>
    readonly phone: FieldRef<"AppUser", 'String'>
    readonly website: FieldRef<"AppUser", 'String'>
    readonly active: FieldRef<"AppUser", 'Boolean'>
    readonly created_at: FieldRef<"AppUser", 'DateTime'>
    readonly updated_at: FieldRef<"AppUser", 'DateTime'>
    readonly email_verified: FieldRef<"AppUser", 'Boolean'>
    readonly email_verified_at: FieldRef<"AppUser", 'DateTime'>
    readonly reset_token: FieldRef<"AppUser", 'String'>
    readonly reset_token_expires: FieldRef<"AppUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppUser findUnique
   */
  export type AppUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * Filter, which AppUser to fetch.
     */
    where: AppUserWhereUniqueInput
  }

  /**
   * AppUser findUniqueOrThrow
   */
  export type AppUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * Filter, which AppUser to fetch.
     */
    where: AppUserWhereUniqueInput
  }

  /**
   * AppUser findFirst
   */
  export type AppUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * Filter, which AppUser to fetch.
     */
    where?: AppUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppUsers to fetch.
     */
    orderBy?: AppUserOrderByWithRelationInput | AppUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppUsers.
     */
    cursor?: AppUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppUsers.
     */
    distinct?: AppUserScalarFieldEnum | AppUserScalarFieldEnum[]
  }

  /**
   * AppUser findFirstOrThrow
   */
  export type AppUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * Filter, which AppUser to fetch.
     */
    where?: AppUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppUsers to fetch.
     */
    orderBy?: AppUserOrderByWithRelationInput | AppUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppUsers.
     */
    cursor?: AppUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppUsers.
     */
    distinct?: AppUserScalarFieldEnum | AppUserScalarFieldEnum[]
  }

  /**
   * AppUser findMany
   */
  export type AppUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * Filter, which AppUsers to fetch.
     */
    where?: AppUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppUsers to fetch.
     */
    orderBy?: AppUserOrderByWithRelationInput | AppUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppUsers.
     */
    cursor?: AppUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppUsers.
     */
    skip?: number
    distinct?: AppUserScalarFieldEnum | AppUserScalarFieldEnum[]
  }

  /**
   * AppUser create
   */
  export type AppUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * The data needed to create a AppUser.
     */
    data: XOR<AppUserCreateInput, AppUserUncheckedCreateInput>
  }

  /**
   * AppUser createMany
   */
  export type AppUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppUsers.
     */
    data: AppUserCreateManyInput | AppUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppUser update
   */
  export type AppUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * The data needed to update a AppUser.
     */
    data: XOR<AppUserUpdateInput, AppUserUncheckedUpdateInput>
    /**
     * Choose, which AppUser to update.
     */
    where: AppUserWhereUniqueInput
  }

  /**
   * AppUser updateMany
   */
  export type AppUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppUsers.
     */
    data: XOR<AppUserUpdateManyMutationInput, AppUserUncheckedUpdateManyInput>
    /**
     * Filter which AppUsers to update
     */
    where?: AppUserWhereInput
    /**
     * Limit how many AppUsers to update.
     */
    limit?: number
  }

  /**
   * AppUser upsert
   */
  export type AppUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * The filter to search for the AppUser to update in case it exists.
     */
    where: AppUserWhereUniqueInput
    /**
     * In case the AppUser found by the `where` argument doesn't exist, create a new AppUser with this data.
     */
    create: XOR<AppUserCreateInput, AppUserUncheckedCreateInput>
    /**
     * In case the AppUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppUserUpdateInput, AppUserUncheckedUpdateInput>
  }

  /**
   * AppUser delete
   */
  export type AppUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
    /**
     * Filter which AppUser to delete.
     */
    where: AppUserWhereUniqueInput
  }

  /**
   * AppUser deleteMany
   */
  export type AppUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppUsers to delete
     */
    where?: AppUserWhereInput
    /**
     * Limit how many AppUsers to delete.
     */
    limit?: number
  }

  /**
   * AppUser.api_keys
   */
  export type AppUser$api_keysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    cursor?: ApiKeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * AppUser.app_sessions
   */
  export type AppUser$app_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    where?: AppSessionWhereInput
    orderBy?: AppSessionOrderByWithRelationInput | AppSessionOrderByWithRelationInput[]
    cursor?: AppSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppSessionScalarFieldEnum | AppSessionScalarFieldEnum[]
  }

  /**
   * AppUser.password_resets
   */
  export type AppUser$password_resetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    where?: PasswordResetWhereInput
  }

  /**
   * AppUser.auth_events
   */
  export type AppUser$auth_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthEvent
     */
    select?: AuthEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthEvent
     */
    omit?: AuthEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthEventInclude<ExtArgs> | null
    where?: AuthEventWhereInput
    orderBy?: AuthEventOrderByWithRelationInput | AuthEventOrderByWithRelationInput[]
    cursor?: AuthEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthEventScalarFieldEnum | AuthEventScalarFieldEnum[]
  }

  /**
   * AppUser without action
   */
  export type AppUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppUser
     */
    select?: AppUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppUser
     */
    omit?: AppUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppUserInclude<ExtArgs> | null
  }


  /**
   * Model ApiKey
   */

  export type AggregateApiKey = {
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  export type ApiKeyMinAggregateOutputType = {
    id: string | null
    app_user_id: string | null
    key: string | null
    name: string | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
    last_used_at: Date | null
    expires_at: Date | null
  }

  export type ApiKeyMaxAggregateOutputType = {
    id: string | null
    app_user_id: string | null
    key: string | null
    name: string | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
    last_used_at: Date | null
    expires_at: Date | null
  }

  export type ApiKeyCountAggregateOutputType = {
    id: number
    app_user_id: number
    key: number
    name: number
    active: number
    created_at: number
    updated_at: number
    last_used_at: number
    expires_at: number
    _all: number
  }


  export type ApiKeyMinAggregateInputType = {
    id?: true
    app_user_id?: true
    key?: true
    name?: true
    active?: true
    created_at?: true
    updated_at?: true
    last_used_at?: true
    expires_at?: true
  }

  export type ApiKeyMaxAggregateInputType = {
    id?: true
    app_user_id?: true
    key?: true
    name?: true
    active?: true
    created_at?: true
    updated_at?: true
    last_used_at?: true
    expires_at?: true
  }

  export type ApiKeyCountAggregateInputType = {
    id?: true
    app_user_id?: true
    key?: true
    name?: true
    active?: true
    created_at?: true
    updated_at?: true
    last_used_at?: true
    expires_at?: true
    _all?: true
  }

  export type ApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKey to aggregate.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeys
    **/
    _count?: true | ApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyMaxAggregateInputType
  }

  export type GetApiKeyAggregateType<T extends ApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKey[P]>
      : GetScalarType<T[P], AggregateApiKey[P]>
  }




  export type ApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithAggregationInput | ApiKeyOrderByWithAggregationInput[]
    by: ApiKeyScalarFieldEnum[] | ApiKeyScalarFieldEnum
    having?: ApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyCountAggregateInputType | true
    _min?: ApiKeyMinAggregateInputType
    _max?: ApiKeyMaxAggregateInputType
  }

  export type ApiKeyGroupByOutputType = {
    id: string
    app_user_id: string
    key: string
    name: string
    active: boolean
    created_at: Date
    updated_at: Date
    last_used_at: Date | null
    expires_at: Date | null
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  type GetApiKeyGroupByPayload<T extends ApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_user_id?: boolean
    key?: boolean
    name?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_used_at?: boolean
    expires_at?: boolean
    app_user?: boolean | AppUserDefaultArgs<ExtArgs>
    users?: boolean | ApiKey$usersArgs<ExtArgs>
    _count?: boolean | ApiKeyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>



  export type ApiKeySelectScalar = {
    id?: boolean
    app_user_id?: boolean
    key?: boolean
    name?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_used_at?: boolean
    expires_at?: boolean
  }

  export type ApiKeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "app_user_id" | "key" | "name" | "active" | "created_at" | "updated_at" | "last_used_at" | "expires_at", ExtArgs["result"]["apiKey"]>
  export type ApiKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app_user?: boolean | AppUserDefaultArgs<ExtArgs>
    users?: boolean | ApiKey$usersArgs<ExtArgs>
    _count?: boolean | ApiKeyCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiKey"
    objects: {
      app_user: Prisma.$AppUserPayload<ExtArgs>
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      app_user_id: string
      key: string
      name: string
      active: boolean
      created_at: Date
      updated_at: Date
      last_used_at: Date | null
      expires_at: Date | null
    }, ExtArgs["result"]["apiKey"]>
    composites: {}
  }

  type ApiKeyGetPayload<S extends boolean | null | undefined | ApiKeyDefaultArgs> = $Result.GetResult<Prisma.$ApiKeyPayload, S>

  type ApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiKeyCountAggregateInputType | true
    }

  export interface ApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiKey'], meta: { name: 'ApiKey' } }
    /**
     * Find zero or one ApiKey that matches the filter.
     * @param {ApiKeyFindUniqueArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiKeyFindUniqueArgs>(args: SelectSubset<T, ApiKeyFindUniqueArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiKey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiKeyFindUniqueOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiKeyFindFirstArgs>(args?: SelectSubset<T, ApiKeyFindFirstArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeys
     * const apiKeys = await prisma.apiKey.findMany()
     * 
     * // Get first 10 ApiKeys
     * const apiKeys = await prisma.apiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiKeyFindManyArgs>(args?: SelectSubset<T, ApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiKey.
     * @param {ApiKeyCreateArgs} args - Arguments to create a ApiKey.
     * @example
     * // Create one ApiKey
     * const ApiKey = await prisma.apiKey.create({
     *   data: {
     *     // ... data to create a ApiKey
     *   }
     * })
     * 
     */
    create<T extends ApiKeyCreateArgs>(args: SelectSubset<T, ApiKeyCreateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiKeys.
     * @param {ApiKeyCreateManyArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiKeyCreateManyArgs>(args?: SelectSubset<T, ApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ApiKey.
     * @param {ApiKeyDeleteArgs} args - Arguments to delete one ApiKey.
     * @example
     * // Delete one ApiKey
     * const ApiKey = await prisma.apiKey.delete({
     *   where: {
     *     // ... filter to delete one ApiKey
     *   }
     * })
     * 
     */
    delete<T extends ApiKeyDeleteArgs>(args: SelectSubset<T, ApiKeyDeleteArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiKey.
     * @param {ApiKeyUpdateArgs} args - Arguments to update one ApiKey.
     * @example
     * // Update one ApiKey
     * const apiKey = await prisma.apiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiKeyUpdateArgs>(args: SelectSubset<T, ApiKeyUpdateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiKeys.
     * @param {ApiKeyDeleteManyArgs} args - Arguments to filter ApiKeys to delete.
     * @example
     * // Delete a few ApiKeys
     * const { count } = await prisma.apiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiKeyDeleteManyArgs>(args?: SelectSubset<T, ApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiKeyUpdateManyArgs>(args: SelectSubset<T, ApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ApiKey.
     * @param {ApiKeyUpsertArgs} args - Arguments to update or create a ApiKey.
     * @example
     * // Update or create a ApiKey
     * const apiKey = await prisma.apiKey.upsert({
     *   create: {
     *     // ... data to create a ApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKey we want to update
     *   }
     * })
     */
    upsert<T extends ApiKeyUpsertArgs>(args: SelectSubset<T, ApiKeyUpsertArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyCountArgs} args - Arguments to filter ApiKeys to count.
     * @example
     * // Count the number of ApiKeys
     * const count = await prisma.apiKey.count({
     *   where: {
     *     // ... the filter for the ApiKeys we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyCountArgs>(
      args?: Subset<T, ApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApiKeyAggregateArgs>(args: Subset<T, ApiKeyAggregateArgs>): Prisma.PrismaPromise<GetApiKeyAggregateType<T>>

    /**
     * Group by ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiKey model
   */
  readonly fields: ApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    app_user<T extends AppUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppUserDefaultArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends ApiKey$usersArgs<ExtArgs> = {}>(args?: Subset<T, ApiKey$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiKey model
   */
  interface ApiKeyFieldRefs {
    readonly id: FieldRef<"ApiKey", 'String'>
    readonly app_user_id: FieldRef<"ApiKey", 'String'>
    readonly key: FieldRef<"ApiKey", 'String'>
    readonly name: FieldRef<"ApiKey", 'String'>
    readonly active: FieldRef<"ApiKey", 'Boolean'>
    readonly created_at: FieldRef<"ApiKey", 'DateTime'>
    readonly updated_at: FieldRef<"ApiKey", 'DateTime'>
    readonly last_used_at: FieldRef<"ApiKey", 'DateTime'>
    readonly expires_at: FieldRef<"ApiKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiKey findUnique
   */
  export type ApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findUniqueOrThrow
   */
  export type ApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findFirst
   */
  export type ApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findFirstOrThrow
   */
  export type ApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findMany
   */
  export type ApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeys to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey create
   */
  export type ApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiKey.
     */
    data: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
  }

  /**
   * ApiKey createMany
   */
  export type ApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKey update
   */
  export type ApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiKey.
     */
    data: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
    /**
     * Choose, which ApiKey to update.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey updateMany
   */
  export type ApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
  }

  /**
   * ApiKey upsert
   */
  export type ApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiKey to update in case it exists.
     */
    where: ApiKeyWhereUniqueInput
    /**
     * In case the ApiKey found by the `where` argument doesn't exist, create a new ApiKey with this data.
     */
    create: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
    /**
     * In case the ApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
  }

  /**
   * ApiKey delete
   */
  export type ApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter which ApiKey to delete.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey deleteMany
   */
  export type ApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeys to delete
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to delete.
     */
    limit?: number
  }

  /**
   * ApiKey.users
   */
  export type ApiKey$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * ApiKey without action
   */
  export type ApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
  }


  /**
   * Model AppSession
   */

  export type AggregateAppSession = {
    _count: AppSessionCountAggregateOutputType | null
    _min: AppSessionMinAggregateOutputType | null
    _max: AppSessionMaxAggregateOutputType | null
  }

  export type AppSessionMinAggregateOutputType = {
    id: string | null
    app_user_id: string | null
    token: string | null
    refresh_token: string | null
    ip_address: string | null
    user_agent: string | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    revoked: boolean | null
    revoked_at: Date | null
  }

  export type AppSessionMaxAggregateOutputType = {
    id: string | null
    app_user_id: string | null
    token: string | null
    refresh_token: string | null
    ip_address: string | null
    user_agent: string | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    revoked: boolean | null
    revoked_at: Date | null
  }

  export type AppSessionCountAggregateOutputType = {
    id: number
    app_user_id: number
    token: number
    refresh_token: number
    ip_address: number
    user_agent: number
    expires_at: number
    created_at: number
    updated_at: number
    revoked: number
    revoked_at: number
    _all: number
  }


  export type AppSessionMinAggregateInputType = {
    id?: true
    app_user_id?: true
    token?: true
    refresh_token?: true
    ip_address?: true
    user_agent?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    revoked?: true
    revoked_at?: true
  }

  export type AppSessionMaxAggregateInputType = {
    id?: true
    app_user_id?: true
    token?: true
    refresh_token?: true
    ip_address?: true
    user_agent?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    revoked?: true
    revoked_at?: true
  }

  export type AppSessionCountAggregateInputType = {
    id?: true
    app_user_id?: true
    token?: true
    refresh_token?: true
    ip_address?: true
    user_agent?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    revoked?: true
    revoked_at?: true
    _all?: true
  }

  export type AppSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppSession to aggregate.
     */
    where?: AppSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSessions to fetch.
     */
    orderBy?: AppSessionOrderByWithRelationInput | AppSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppSessions
    **/
    _count?: true | AppSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppSessionMaxAggregateInputType
  }

  export type GetAppSessionAggregateType<T extends AppSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAppSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppSession[P]>
      : GetScalarType<T[P], AggregateAppSession[P]>
  }




  export type AppSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppSessionWhereInput
    orderBy?: AppSessionOrderByWithAggregationInput | AppSessionOrderByWithAggregationInput[]
    by: AppSessionScalarFieldEnum[] | AppSessionScalarFieldEnum
    having?: AppSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppSessionCountAggregateInputType | true
    _min?: AppSessionMinAggregateInputType
    _max?: AppSessionMaxAggregateInputType
  }

  export type AppSessionGroupByOutputType = {
    id: string
    app_user_id: string
    token: string
    refresh_token: string | null
    ip_address: string | null
    user_agent: string | null
    expires_at: Date
    created_at: Date
    updated_at: Date
    revoked: boolean
    revoked_at: Date | null
    _count: AppSessionCountAggregateOutputType | null
    _min: AppSessionMinAggregateOutputType | null
    _max: AppSessionMaxAggregateOutputType | null
  }

  type GetAppSessionGroupByPayload<T extends AppSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppSessionGroupByOutputType[P]>
            : GetScalarType<T[P], AppSessionGroupByOutputType[P]>
        }
      >
    >


  export type AppSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_user_id?: boolean
    token?: boolean
    refresh_token?: boolean
    ip_address?: boolean
    user_agent?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    revoked?: boolean
    revoked_at?: boolean
    app_user?: boolean | AppUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appSession"]>



  export type AppSessionSelectScalar = {
    id?: boolean
    app_user_id?: boolean
    token?: boolean
    refresh_token?: boolean
    ip_address?: boolean
    user_agent?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    revoked?: boolean
    revoked_at?: boolean
  }

  export type AppSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "app_user_id" | "token" | "refresh_token" | "ip_address" | "user_agent" | "expires_at" | "created_at" | "updated_at" | "revoked" | "revoked_at", ExtArgs["result"]["appSession"]>
  export type AppSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app_user?: boolean | AppUserDefaultArgs<ExtArgs>
  }

  export type $AppSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppSession"
    objects: {
      app_user: Prisma.$AppUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      app_user_id: string
      token: string
      refresh_token: string | null
      ip_address: string | null
      user_agent: string | null
      expires_at: Date
      created_at: Date
      updated_at: Date
      revoked: boolean
      revoked_at: Date | null
    }, ExtArgs["result"]["appSession"]>
    composites: {}
  }

  type AppSessionGetPayload<S extends boolean | null | undefined | AppSessionDefaultArgs> = $Result.GetResult<Prisma.$AppSessionPayload, S>

  type AppSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppSessionCountAggregateInputType | true
    }

  export interface AppSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppSession'], meta: { name: 'AppSession' } }
    /**
     * Find zero or one AppSession that matches the filter.
     * @param {AppSessionFindUniqueArgs} args - Arguments to find a AppSession
     * @example
     * // Get one AppSession
     * const appSession = await prisma.appSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppSessionFindUniqueArgs>(args: SelectSubset<T, AppSessionFindUniqueArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AppSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppSessionFindUniqueOrThrowArgs} args - Arguments to find a AppSession
     * @example
     * // Get one AppSession
     * const appSession = await prisma.appSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AppSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionFindFirstArgs} args - Arguments to find a AppSession
     * @example
     * // Get one AppSession
     * const appSession = await prisma.appSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppSessionFindFirstArgs>(args?: SelectSubset<T, AppSessionFindFirstArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionFindFirstOrThrowArgs} args - Arguments to find a AppSession
     * @example
     * // Get one AppSession
     * const appSession = await prisma.appSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AppSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AppSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppSessions
     * const appSessions = await prisma.appSession.findMany()
     * 
     * // Get first 10 AppSessions
     * const appSessions = await prisma.appSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appSessionWithIdOnly = await prisma.appSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppSessionFindManyArgs>(args?: SelectSubset<T, AppSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AppSession.
     * @param {AppSessionCreateArgs} args - Arguments to create a AppSession.
     * @example
     * // Create one AppSession
     * const AppSession = await prisma.appSession.create({
     *   data: {
     *     // ... data to create a AppSession
     *   }
     * })
     * 
     */
    create<T extends AppSessionCreateArgs>(args: SelectSubset<T, AppSessionCreateArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AppSessions.
     * @param {AppSessionCreateManyArgs} args - Arguments to create many AppSessions.
     * @example
     * // Create many AppSessions
     * const appSession = await prisma.appSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppSessionCreateManyArgs>(args?: SelectSubset<T, AppSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AppSession.
     * @param {AppSessionDeleteArgs} args - Arguments to delete one AppSession.
     * @example
     * // Delete one AppSession
     * const AppSession = await prisma.appSession.delete({
     *   where: {
     *     // ... filter to delete one AppSession
     *   }
     * })
     * 
     */
    delete<T extends AppSessionDeleteArgs>(args: SelectSubset<T, AppSessionDeleteArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AppSession.
     * @param {AppSessionUpdateArgs} args - Arguments to update one AppSession.
     * @example
     * // Update one AppSession
     * const appSession = await prisma.appSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppSessionUpdateArgs>(args: SelectSubset<T, AppSessionUpdateArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AppSessions.
     * @param {AppSessionDeleteManyArgs} args - Arguments to filter AppSessions to delete.
     * @example
     * // Delete a few AppSessions
     * const { count } = await prisma.appSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppSessionDeleteManyArgs>(args?: SelectSubset<T, AppSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppSessions
     * const appSession = await prisma.appSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppSessionUpdateManyArgs>(args: SelectSubset<T, AppSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AppSession.
     * @param {AppSessionUpsertArgs} args - Arguments to update or create a AppSession.
     * @example
     * // Update or create a AppSession
     * const appSession = await prisma.appSession.upsert({
     *   create: {
     *     // ... data to create a AppSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppSession we want to update
     *   }
     * })
     */
    upsert<T extends AppSessionUpsertArgs>(args: SelectSubset<T, AppSessionUpsertArgs<ExtArgs>>): Prisma__AppSessionClient<$Result.GetResult<Prisma.$AppSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AppSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionCountArgs} args - Arguments to filter AppSessions to count.
     * @example
     * // Count the number of AppSessions
     * const count = await prisma.appSession.count({
     *   where: {
     *     // ... the filter for the AppSessions we want to count
     *   }
     * })
    **/
    count<T extends AppSessionCountArgs>(
      args?: Subset<T, AppSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppSessionAggregateArgs>(args: Subset<T, AppSessionAggregateArgs>): Prisma.PrismaPromise<GetAppSessionAggregateType<T>>

    /**
     * Group by AppSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppSessionGroupByArgs['orderBy'] }
        : { orderBy?: AppSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppSession model
   */
  readonly fields: AppSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    app_user<T extends AppUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppUserDefaultArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppSession model
   */
  interface AppSessionFieldRefs {
    readonly id: FieldRef<"AppSession", 'String'>
    readonly app_user_id: FieldRef<"AppSession", 'String'>
    readonly token: FieldRef<"AppSession", 'String'>
    readonly refresh_token: FieldRef<"AppSession", 'String'>
    readonly ip_address: FieldRef<"AppSession", 'String'>
    readonly user_agent: FieldRef<"AppSession", 'String'>
    readonly expires_at: FieldRef<"AppSession", 'DateTime'>
    readonly created_at: FieldRef<"AppSession", 'DateTime'>
    readonly updated_at: FieldRef<"AppSession", 'DateTime'>
    readonly revoked: FieldRef<"AppSession", 'Boolean'>
    readonly revoked_at: FieldRef<"AppSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppSession findUnique
   */
  export type AppSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * Filter, which AppSession to fetch.
     */
    where: AppSessionWhereUniqueInput
  }

  /**
   * AppSession findUniqueOrThrow
   */
  export type AppSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * Filter, which AppSession to fetch.
     */
    where: AppSessionWhereUniqueInput
  }

  /**
   * AppSession findFirst
   */
  export type AppSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * Filter, which AppSession to fetch.
     */
    where?: AppSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSessions to fetch.
     */
    orderBy?: AppSessionOrderByWithRelationInput | AppSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppSessions.
     */
    cursor?: AppSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppSessions.
     */
    distinct?: AppSessionScalarFieldEnum | AppSessionScalarFieldEnum[]
  }

  /**
   * AppSession findFirstOrThrow
   */
  export type AppSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * Filter, which AppSession to fetch.
     */
    where?: AppSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSessions to fetch.
     */
    orderBy?: AppSessionOrderByWithRelationInput | AppSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppSessions.
     */
    cursor?: AppSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppSessions.
     */
    distinct?: AppSessionScalarFieldEnum | AppSessionScalarFieldEnum[]
  }

  /**
   * AppSession findMany
   */
  export type AppSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * Filter, which AppSessions to fetch.
     */
    where?: AppSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSessions to fetch.
     */
    orderBy?: AppSessionOrderByWithRelationInput | AppSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppSessions.
     */
    cursor?: AppSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSessions.
     */
    skip?: number
    distinct?: AppSessionScalarFieldEnum | AppSessionScalarFieldEnum[]
  }

  /**
   * AppSession create
   */
  export type AppSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a AppSession.
     */
    data: XOR<AppSessionCreateInput, AppSessionUncheckedCreateInput>
  }

  /**
   * AppSession createMany
   */
  export type AppSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppSessions.
     */
    data: AppSessionCreateManyInput | AppSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppSession update
   */
  export type AppSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a AppSession.
     */
    data: XOR<AppSessionUpdateInput, AppSessionUncheckedUpdateInput>
    /**
     * Choose, which AppSession to update.
     */
    where: AppSessionWhereUniqueInput
  }

  /**
   * AppSession updateMany
   */
  export type AppSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppSessions.
     */
    data: XOR<AppSessionUpdateManyMutationInput, AppSessionUncheckedUpdateManyInput>
    /**
     * Filter which AppSessions to update
     */
    where?: AppSessionWhereInput
    /**
     * Limit how many AppSessions to update.
     */
    limit?: number
  }

  /**
   * AppSession upsert
   */
  export type AppSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the AppSession to update in case it exists.
     */
    where: AppSessionWhereUniqueInput
    /**
     * In case the AppSession found by the `where` argument doesn't exist, create a new AppSession with this data.
     */
    create: XOR<AppSessionCreateInput, AppSessionUncheckedCreateInput>
    /**
     * In case the AppSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppSessionUpdateInput, AppSessionUncheckedUpdateInput>
  }

  /**
   * AppSession delete
   */
  export type AppSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
    /**
     * Filter which AppSession to delete.
     */
    where: AppSessionWhereUniqueInput
  }

  /**
   * AppSession deleteMany
   */
  export type AppSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppSessions to delete
     */
    where?: AppSessionWhereInput
    /**
     * Limit how many AppSessions to delete.
     */
    limit?: number
  }

  /**
   * AppSession without action
   */
  export type AppSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSession
     */
    select?: AppSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSession
     */
    omit?: AppSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppSessionInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    api_key_id: string | null
    email: string | null
    username: string | null
    password_hash: string | null
    name: string | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
    email_verified: boolean | null
    email_verified_at: Date | null
    reset_token: string | null
    reset_token_expires: Date | null
    ip_address: string | null
    user_agent: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    api_key_id: string | null
    email: string | null
    username: string | null
    password_hash: string | null
    name: string | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
    email_verified: boolean | null
    email_verified_at: Date | null
    reset_token: string | null
    reset_token_expires: Date | null
    ip_address: string | null
    user_agent: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    api_key_id: number
    email: number
    username: number
    password_hash: number
    name: number
    active: number
    created_at: number
    updated_at: number
    email_verified: number
    email_verified_at: number
    reset_token: number
    reset_token_expires: number
    ip_address: number
    user_agent: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    api_key_id?: true
    email?: true
    username?: true
    password_hash?: true
    name?: true
    active?: true
    created_at?: true
    updated_at?: true
    email_verified?: true
    email_verified_at?: true
    reset_token?: true
    reset_token_expires?: true
    ip_address?: true
    user_agent?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    api_key_id?: true
    email?: true
    username?: true
    password_hash?: true
    name?: true
    active?: true
    created_at?: true
    updated_at?: true
    email_verified?: true
    email_verified_at?: true
    reset_token?: true
    reset_token_expires?: true
    ip_address?: true
    user_agent?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    api_key_id?: true
    email?: true
    username?: true
    password_hash?: true
    name?: true
    active?: true
    created_at?: true
    updated_at?: true
    email_verified?: true
    email_verified_at?: true
    reset_token?: true
    reset_token_expires?: true
    ip_address?: true
    user_agent?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    api_key_id: string
    email: string
    username: string
    password_hash: string
    name: string | null
    active: boolean
    created_at: Date
    updated_at: Date
    email_verified: boolean
    email_verified_at: Date | null
    reset_token: string | null
    reset_token_expires: Date | null
    ip_address: string | null
    user_agent: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    api_key_id?: boolean
    email?: boolean
    username?: boolean
    password_hash?: boolean
    name?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
    email_verified?: boolean
    email_verified_at?: boolean
    reset_token?: boolean
    reset_token_expires?: boolean
    ip_address?: boolean
    user_agent?: boolean
    api_key?: boolean | ApiKeyDefaultArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    auth_logs?: boolean | User$auth_logsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    api_key_id?: boolean
    email?: boolean
    username?: boolean
    password_hash?: boolean
    name?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
    email_verified?: boolean
    email_verified_at?: boolean
    reset_token?: boolean
    reset_token_expires?: boolean
    ip_address?: boolean
    user_agent?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "api_key_id" | "email" | "username" | "password_hash" | "name" | "active" | "created_at" | "updated_at" | "email_verified" | "email_verified_at" | "reset_token" | "reset_token_expires" | "ip_address" | "user_agent", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    api_key?: boolean | ApiKeyDefaultArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    auth_logs?: boolean | User$auth_logsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      api_key: Prisma.$ApiKeyPayload<ExtArgs>
      accounts: Prisma.$UserAccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      auth_logs: Prisma.$AuthLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      api_key_id: string
      email: string
      username: string
      password_hash: string
      name: string | null
      active: boolean
      created_at: Date
      updated_at: Date
      email_verified: boolean
      email_verified_at: Date | null
      reset_token: string | null
      reset_token_expires: Date | null
      ip_address: string | null
      user_agent: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    api_key<T extends ApiKeyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ApiKeyDefaultArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auth_logs<T extends User$auth_logsArgs<ExtArgs> = {}>(args?: Subset<T, User$auth_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly api_key_id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly active: FieldRef<"User", 'Boolean'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
    readonly email_verified: FieldRef<"User", 'Boolean'>
    readonly email_verified_at: FieldRef<"User", 'DateTime'>
    readonly reset_token: FieldRef<"User", 'String'>
    readonly reset_token_expires: FieldRef<"User", 'DateTime'>
    readonly ip_address: FieldRef<"User", 'String'>
    readonly user_agent: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    where?: UserAccountWhereInput
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    cursor?: UserAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAccountScalarFieldEnum | UserAccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.auth_logs
   */
  export type User$auth_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLog
     */
    select?: AuthLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthLog
     */
    omit?: AuthLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLogInclude<ExtArgs> | null
    where?: AuthLogWhereInput
    orderBy?: AuthLogOrderByWithRelationInput | AuthLogOrderByWithRelationInput[]
    cursor?: AuthLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthLogScalarFieldEnum | AuthLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    name: string | null
    api_key: string | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    name: string | null
    api_key: string | null
    active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    name: number
    api_key: number
    active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    name?: true
    api_key?: true
    active?: true
    created_at?: true
    updated_at?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    name?: true
    api_key?: true
    active?: true
    created_at?: true
    updated_at?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    name?: true
    api_key?: true
    active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    name: string
    api_key: string
    active: boolean
    created_at: Date
    updated_at: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    api_key?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
    user_accounts?: boolean | Account$user_accountsArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>



  export type AccountSelectScalar = {
    id?: boolean
    name?: boolean
    api_key?: boolean
    active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "api_key" | "active" | "created_at" | "updated_at", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_accounts?: boolean | Account$user_accountsArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user_accounts: Prisma.$UserAccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      api_key: string
      active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user_accounts<T extends Account$user_accountsArgs<ExtArgs> = {}>(args?: Subset<T, Account$user_accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly name: FieldRef<"Account", 'String'>
    readonly api_key: FieldRef<"Account", 'String'>
    readonly active: FieldRef<"Account", 'Boolean'>
    readonly created_at: FieldRef<"Account", 'DateTime'>
    readonly updated_at: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account.user_accounts
   */
  export type Account$user_accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    where?: UserAccountWhereInput
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    cursor?: UserAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAccountScalarFieldEnum | UserAccountScalarFieldEnum[]
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model UserAccount
   */

  export type AggregateUserAccount = {
    _count: UserAccountCountAggregateOutputType | null
    _min: UserAccountMinAggregateOutputType | null
    _max: UserAccountMaxAggregateOutputType | null
  }

  export type UserAccountMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    account_id: string | null
    created_at: Date | null
    created_by: string | null
  }

  export type UserAccountMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    account_id: string | null
    created_at: Date | null
    created_by: string | null
  }

  export type UserAccountCountAggregateOutputType = {
    id: number
    user_id: number
    account_id: number
    created_at: number
    created_by: number
    _all: number
  }


  export type UserAccountMinAggregateInputType = {
    id?: true
    user_id?: true
    account_id?: true
    created_at?: true
    created_by?: true
  }

  export type UserAccountMaxAggregateInputType = {
    id?: true
    user_id?: true
    account_id?: true
    created_at?: true
    created_by?: true
  }

  export type UserAccountCountAggregateInputType = {
    id?: true
    user_id?: true
    account_id?: true
    created_at?: true
    created_by?: true
    _all?: true
  }

  export type UserAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAccount to aggregate.
     */
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     */
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAccounts
    **/
    _count?: true | UserAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAccountMaxAggregateInputType
  }

  export type GetUserAccountAggregateType<T extends UserAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAccount[P]>
      : GetScalarType<T[P], AggregateUserAccount[P]>
  }




  export type UserAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAccountWhereInput
    orderBy?: UserAccountOrderByWithAggregationInput | UserAccountOrderByWithAggregationInput[]
    by: UserAccountScalarFieldEnum[] | UserAccountScalarFieldEnum
    having?: UserAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAccountCountAggregateInputType | true
    _min?: UserAccountMinAggregateInputType
    _max?: UserAccountMaxAggregateInputType
  }

  export type UserAccountGroupByOutputType = {
    id: string
    user_id: string
    account_id: string
    created_at: Date
    created_by: string | null
    _count: UserAccountCountAggregateOutputType | null
    _min: UserAccountMinAggregateOutputType | null
    _max: UserAccountMaxAggregateOutputType | null
  }

  type GetUserAccountGroupByPayload<T extends UserAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAccountGroupByOutputType[P]>
            : GetScalarType<T[P], UserAccountGroupByOutputType[P]>
        }
      >
    >


  export type UserAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    account_id?: boolean
    created_at?: boolean
    created_by?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAccount"]>



  export type UserAccountSelectScalar = {
    id?: boolean
    user_id?: boolean
    account_id?: boolean
    created_at?: boolean
    created_by?: boolean
  }

  export type UserAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "account_id" | "created_at" | "created_by", ExtArgs["result"]["userAccount"]>
  export type UserAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }

  export type $UserAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAccount"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      account: Prisma.$AccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      account_id: string
      created_at: Date
      created_by: string | null
    }, ExtArgs["result"]["userAccount"]>
    composites: {}
  }

  type UserAccountGetPayload<S extends boolean | null | undefined | UserAccountDefaultArgs> = $Result.GetResult<Prisma.$UserAccountPayload, S>

  type UserAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserAccountCountAggregateInputType | true
    }

  export interface UserAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAccount'], meta: { name: 'UserAccount' } }
    /**
     * Find zero or one UserAccount that matches the filter.
     * @param {UserAccountFindUniqueArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAccountFindUniqueArgs>(args: SelectSubset<T, UserAccountFindUniqueArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserAccountFindUniqueOrThrowArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, UserAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountFindFirstArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAccountFindFirstArgs>(args?: SelectSubset<T, UserAccountFindFirstArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountFindFirstOrThrowArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, UserAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAccounts
     * const userAccounts = await prisma.userAccount.findMany()
     * 
     * // Get first 10 UserAccounts
     * const userAccounts = await prisma.userAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAccountWithIdOnly = await prisma.userAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserAccountFindManyArgs>(args?: SelectSubset<T, UserAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserAccount.
     * @param {UserAccountCreateArgs} args - Arguments to create a UserAccount.
     * @example
     * // Create one UserAccount
     * const UserAccount = await prisma.userAccount.create({
     *   data: {
     *     // ... data to create a UserAccount
     *   }
     * })
     * 
     */
    create<T extends UserAccountCreateArgs>(args: SelectSubset<T, UserAccountCreateArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserAccounts.
     * @param {UserAccountCreateManyArgs} args - Arguments to create many UserAccounts.
     * @example
     * // Create many UserAccounts
     * const userAccount = await prisma.userAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserAccountCreateManyArgs>(args?: SelectSubset<T, UserAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserAccount.
     * @param {UserAccountDeleteArgs} args - Arguments to delete one UserAccount.
     * @example
     * // Delete one UserAccount
     * const UserAccount = await prisma.userAccount.delete({
     *   where: {
     *     // ... filter to delete one UserAccount
     *   }
     * })
     * 
     */
    delete<T extends UserAccountDeleteArgs>(args: SelectSubset<T, UserAccountDeleteArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserAccount.
     * @param {UserAccountUpdateArgs} args - Arguments to update one UserAccount.
     * @example
     * // Update one UserAccount
     * const userAccount = await prisma.userAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserAccountUpdateArgs>(args: SelectSubset<T, UserAccountUpdateArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserAccounts.
     * @param {UserAccountDeleteManyArgs} args - Arguments to filter UserAccounts to delete.
     * @example
     * // Delete a few UserAccounts
     * const { count } = await prisma.userAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserAccountDeleteManyArgs>(args?: SelectSubset<T, UserAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAccounts
     * const userAccount = await prisma.userAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserAccountUpdateManyArgs>(args: SelectSubset<T, UserAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserAccount.
     * @param {UserAccountUpsertArgs} args - Arguments to update or create a UserAccount.
     * @example
     * // Update or create a UserAccount
     * const userAccount = await prisma.userAccount.upsert({
     *   create: {
     *     // ... data to create a UserAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAccount we want to update
     *   }
     * })
     */
    upsert<T extends UserAccountUpsertArgs>(args: SelectSubset<T, UserAccountUpsertArgs<ExtArgs>>): Prisma__UserAccountClient<$Result.GetResult<Prisma.$UserAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountCountArgs} args - Arguments to filter UserAccounts to count.
     * @example
     * // Count the number of UserAccounts
     * const count = await prisma.userAccount.count({
     *   where: {
     *     // ... the filter for the UserAccounts we want to count
     *   }
     * })
    **/
    count<T extends UserAccountCountArgs>(
      args?: Subset<T, UserAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAccountAggregateArgs>(args: Subset<T, UserAccountAggregateArgs>): Prisma.PrismaPromise<GetUserAccountAggregateType<T>>

    /**
     * Group by UserAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAccountGroupByArgs['orderBy'] }
        : { orderBy?: UserAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAccount model
   */
  readonly fields: UserAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserAccount model
   */
  interface UserAccountFieldRefs {
    readonly id: FieldRef<"UserAccount", 'String'>
    readonly user_id: FieldRef<"UserAccount", 'String'>
    readonly account_id: FieldRef<"UserAccount", 'String'>
    readonly created_at: FieldRef<"UserAccount", 'DateTime'>
    readonly created_by: FieldRef<"UserAccount", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserAccount findUnique
   */
  export type UserAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccount to fetch.
     */
    where: UserAccountWhereUniqueInput
  }

  /**
   * UserAccount findUniqueOrThrow
   */
  export type UserAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccount to fetch.
     */
    where: UserAccountWhereUniqueInput
  }

  /**
   * UserAccount findFirst
   */
  export type UserAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccount to fetch.
     */
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     */
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAccounts.
     */
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAccounts.
     */
    distinct?: UserAccountScalarFieldEnum | UserAccountScalarFieldEnum[]
  }

  /**
   * UserAccount findFirstOrThrow
   */
  export type UserAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccount to fetch.
     */
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     */
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAccounts.
     */
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAccounts.
     */
    distinct?: UserAccountScalarFieldEnum | UserAccountScalarFieldEnum[]
  }

  /**
   * UserAccount findMany
   */
  export type UserAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter, which UserAccounts to fetch.
     */
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     */
    orderBy?: UserAccountOrderByWithRelationInput | UserAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAccounts.
     */
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     */
    skip?: number
    distinct?: UserAccountScalarFieldEnum | UserAccountScalarFieldEnum[]
  }

  /**
   * UserAccount create
   */
  export type UserAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAccount.
     */
    data: XOR<UserAccountCreateInput, UserAccountUncheckedCreateInput>
  }

  /**
   * UserAccount createMany
   */
  export type UserAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAccounts.
     */
    data: UserAccountCreateManyInput | UserAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAccount update
   */
  export type UserAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAccount.
     */
    data: XOR<UserAccountUpdateInput, UserAccountUncheckedUpdateInput>
    /**
     * Choose, which UserAccount to update.
     */
    where: UserAccountWhereUniqueInput
  }

  /**
   * UserAccount updateMany
   */
  export type UserAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAccounts.
     */
    data: XOR<UserAccountUpdateManyMutationInput, UserAccountUncheckedUpdateManyInput>
    /**
     * Filter which UserAccounts to update
     */
    where?: UserAccountWhereInput
    /**
     * Limit how many UserAccounts to update.
     */
    limit?: number
  }

  /**
   * UserAccount upsert
   */
  export type UserAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAccount to update in case it exists.
     */
    where: UserAccountWhereUniqueInput
    /**
     * In case the UserAccount found by the `where` argument doesn't exist, create a new UserAccount with this data.
     */
    create: XOR<UserAccountCreateInput, UserAccountUncheckedCreateInput>
    /**
     * In case the UserAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAccountUpdateInput, UserAccountUncheckedUpdateInput>
  }

  /**
   * UserAccount delete
   */
  export type UserAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
    /**
     * Filter which UserAccount to delete.
     */
    where: UserAccountWhereUniqueInput
  }

  /**
   * UserAccount deleteMany
   */
  export type UserAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAccounts to delete
     */
    where?: UserAccountWhereInput
    /**
     * Limit how many UserAccounts to delete.
     */
    limit?: number
  }

  /**
   * UserAccount without action
   */
  export type UserAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAccount
     */
    select?: UserAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAccount
     */
    omit?: UserAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    token: string | null
    refresh_token: string | null
    ip_address: string | null
    user_agent: string | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    revoked: boolean | null
    revoked_at: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    token: string | null
    refresh_token: string | null
    ip_address: string | null
    user_agent: string | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    revoked: boolean | null
    revoked_at: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    user_id: number
    token: number
    refresh_token: number
    ip_address: number
    user_agent: number
    expires_at: number
    created_at: number
    updated_at: number
    revoked: number
    revoked_at: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    refresh_token?: true
    ip_address?: true
    user_agent?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    revoked?: true
    revoked_at?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    refresh_token?: true
    ip_address?: true
    user_agent?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    revoked?: true
    revoked_at?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    refresh_token?: true
    ip_address?: true
    user_agent?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    revoked?: true
    revoked_at?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    user_id: string
    token: string
    refresh_token: string | null
    ip_address: string | null
    user_agent: string | null
    expires_at: Date
    created_at: Date
    updated_at: Date
    revoked: boolean
    revoked_at: Date | null
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token?: boolean
    refresh_token?: boolean
    ip_address?: boolean
    user_agent?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    revoked?: boolean
    revoked_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>



  export type SessionSelectScalar = {
    id?: boolean
    user_id?: boolean
    token?: boolean
    refresh_token?: boolean
    ip_address?: boolean
    user_agent?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    revoked?: boolean
    revoked_at?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "token" | "refresh_token" | "ip_address" | "user_agent" | "expires_at" | "created_at" | "updated_at" | "revoked" | "revoked_at", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      token: string
      refresh_token: string | null
      ip_address: string | null
      user_agent: string | null
      expires_at: Date
      created_at: Date
      updated_at: Date
      revoked: boolean
      revoked_at: Date | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly user_id: FieldRef<"Session", 'String'>
    readonly token: FieldRef<"Session", 'String'>
    readonly refresh_token: FieldRef<"Session", 'String'>
    readonly ip_address: FieldRef<"Session", 'String'>
    readonly user_agent: FieldRef<"Session", 'String'>
    readonly expires_at: FieldRef<"Session", 'DateTime'>
    readonly created_at: FieldRef<"Session", 'DateTime'>
    readonly updated_at: FieldRef<"Session", 'DateTime'>
    readonly revoked: FieldRef<"Session", 'Boolean'>
    readonly revoked_at: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model AuthLog
   */

  export type AggregateAuthLog = {
    _count: AuthLogCountAggregateOutputType | null
    _min: AuthLogMinAggregateOutputType | null
    _max: AuthLogMaxAggregateOutputType | null
  }

  export type AuthLogMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    event_type: $Enums.AuthEventType | null
    status: $Enums.AuthEventStatus | null
    ip_address: string | null
    user_agent: string | null
    details: string | null
    created_at: Date | null
  }

  export type AuthLogMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    event_type: $Enums.AuthEventType | null
    status: $Enums.AuthEventStatus | null
    ip_address: string | null
    user_agent: string | null
    details: string | null
    created_at: Date | null
  }

  export type AuthLogCountAggregateOutputType = {
    id: number
    user_id: number
    event_type: number
    status: number
    ip_address: number
    user_agent: number
    details: number
    created_at: number
    _all: number
  }


  export type AuthLogMinAggregateInputType = {
    id?: true
    user_id?: true
    event_type?: true
    status?: true
    ip_address?: true
    user_agent?: true
    details?: true
    created_at?: true
  }

  export type AuthLogMaxAggregateInputType = {
    id?: true
    user_id?: true
    event_type?: true
    status?: true
    ip_address?: true
    user_agent?: true
    details?: true
    created_at?: true
  }

  export type AuthLogCountAggregateInputType = {
    id?: true
    user_id?: true
    event_type?: true
    status?: true
    ip_address?: true
    user_agent?: true
    details?: true
    created_at?: true
    _all?: true
  }

  export type AuthLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthLog to aggregate.
     */
    where?: AuthLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthLogs to fetch.
     */
    orderBy?: AuthLogOrderByWithRelationInput | AuthLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthLogs
    **/
    _count?: true | AuthLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthLogMaxAggregateInputType
  }

  export type GetAuthLogAggregateType<T extends AuthLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthLog[P]>
      : GetScalarType<T[P], AggregateAuthLog[P]>
  }




  export type AuthLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthLogWhereInput
    orderBy?: AuthLogOrderByWithAggregationInput | AuthLogOrderByWithAggregationInput[]
    by: AuthLogScalarFieldEnum[] | AuthLogScalarFieldEnum
    having?: AuthLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthLogCountAggregateInputType | true
    _min?: AuthLogMinAggregateInputType
    _max?: AuthLogMaxAggregateInputType
  }

  export type AuthLogGroupByOutputType = {
    id: string
    user_id: string | null
    event_type: $Enums.AuthEventType
    status: $Enums.AuthEventStatus
    ip_address: string | null
    user_agent: string | null
    details: string | null
    created_at: Date
    _count: AuthLogCountAggregateOutputType | null
    _min: AuthLogMinAggregateOutputType | null
    _max: AuthLogMaxAggregateOutputType | null
  }

  type GetAuthLogGroupByPayload<T extends AuthLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuthLogGroupByOutputType[P]>
        }
      >
    >


  export type AuthLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_type?: boolean
    status?: boolean
    ip_address?: boolean
    user_agent?: boolean
    details?: boolean
    created_at?: boolean
    user?: boolean | AuthLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["authLog"]>



  export type AuthLogSelectScalar = {
    id?: boolean
    user_id?: boolean
    event_type?: boolean
    status?: boolean
    ip_address?: boolean
    user_agent?: boolean
    details?: boolean
    created_at?: boolean
  }

  export type AuthLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "event_type" | "status" | "ip_address" | "user_agent" | "details" | "created_at", ExtArgs["result"]["authLog"]>
  export type AuthLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuthLog$userArgs<ExtArgs>
  }

  export type $AuthLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string | null
      event_type: $Enums.AuthEventType
      status: $Enums.AuthEventStatus
      ip_address: string | null
      user_agent: string | null
      details: string | null
      created_at: Date
    }, ExtArgs["result"]["authLog"]>
    composites: {}
  }

  type AuthLogGetPayload<S extends boolean | null | undefined | AuthLogDefaultArgs> = $Result.GetResult<Prisma.$AuthLogPayload, S>

  type AuthLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthLogCountAggregateInputType | true
    }

  export interface AuthLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthLog'], meta: { name: 'AuthLog' } }
    /**
     * Find zero or one AuthLog that matches the filter.
     * @param {AuthLogFindUniqueArgs} args - Arguments to find a AuthLog
     * @example
     * // Get one AuthLog
     * const authLog = await prisma.authLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthLogFindUniqueArgs>(args: SelectSubset<T, AuthLogFindUniqueArgs<ExtArgs>>): Prisma__AuthLogClient<$Result.GetResult<Prisma.$AuthLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthLogFindUniqueOrThrowArgs} args - Arguments to find a AuthLog
     * @example
     * // Get one AuthLog
     * const authLog = await prisma.authLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthLogClient<$Result.GetResult<Prisma.$AuthLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLogFindFirstArgs} args - Arguments to find a AuthLog
     * @example
     * // Get one AuthLog
     * const authLog = await prisma.authLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthLogFindFirstArgs>(args?: SelectSubset<T, AuthLogFindFirstArgs<ExtArgs>>): Prisma__AuthLogClient<$Result.GetResult<Prisma.$AuthLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLogFindFirstOrThrowArgs} args - Arguments to find a AuthLog
     * @example
     * // Get one AuthLog
     * const authLog = await prisma.authLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthLogClient<$Result.GetResult<Prisma.$AuthLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthLogs
     * const authLogs = await prisma.authLog.findMany()
     * 
     * // Get first 10 AuthLogs
     * const authLogs = await prisma.authLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authLogWithIdOnly = await prisma.authLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthLogFindManyArgs>(args?: SelectSubset<T, AuthLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthLog.
     * @param {AuthLogCreateArgs} args - Arguments to create a AuthLog.
     * @example
     * // Create one AuthLog
     * const AuthLog = await prisma.authLog.create({
     *   data: {
     *     // ... data to create a AuthLog
     *   }
     * })
     * 
     */
    create<T extends AuthLogCreateArgs>(args: SelectSubset<T, AuthLogCreateArgs<ExtArgs>>): Prisma__AuthLogClient<$Result.GetResult<Prisma.$AuthLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthLogs.
     * @param {AuthLogCreateManyArgs} args - Arguments to create many AuthLogs.
     * @example
     * // Create many AuthLogs
     * const authLog = await prisma.authLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthLogCreateManyArgs>(args?: SelectSubset<T, AuthLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AuthLog.
     * @param {AuthLogDeleteArgs} args - Arguments to delete one AuthLog.
     * @example
     * // Delete one AuthLog
     * const AuthLog = await prisma.authLog.delete({
     *   where: {
     *     // ... filter to delete one AuthLog
     *   }
     * })
     * 
     */
    delete<T extends AuthLogDeleteArgs>(args: SelectSubset<T, AuthLogDeleteArgs<ExtArgs>>): Prisma__AuthLogClient<$Result.GetResult<Prisma.$AuthLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthLog.
     * @param {AuthLogUpdateArgs} args - Arguments to update one AuthLog.
     * @example
     * // Update one AuthLog
     * const authLog = await prisma.authLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthLogUpdateArgs>(args: SelectSubset<T, AuthLogUpdateArgs<ExtArgs>>): Prisma__AuthLogClient<$Result.GetResult<Prisma.$AuthLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthLogs.
     * @param {AuthLogDeleteManyArgs} args - Arguments to filter AuthLogs to delete.
     * @example
     * // Delete a few AuthLogs
     * const { count } = await prisma.authLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthLogDeleteManyArgs>(args?: SelectSubset<T, AuthLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthLogs
     * const authLog = await prisma.authLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthLogUpdateManyArgs>(args: SelectSubset<T, AuthLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthLog.
     * @param {AuthLogUpsertArgs} args - Arguments to update or create a AuthLog.
     * @example
     * // Update or create a AuthLog
     * const authLog = await prisma.authLog.upsert({
     *   create: {
     *     // ... data to create a AuthLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthLog we want to update
     *   }
     * })
     */
    upsert<T extends AuthLogUpsertArgs>(args: SelectSubset<T, AuthLogUpsertArgs<ExtArgs>>): Prisma__AuthLogClient<$Result.GetResult<Prisma.$AuthLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLogCountArgs} args - Arguments to filter AuthLogs to count.
     * @example
     * // Count the number of AuthLogs
     * const count = await prisma.authLog.count({
     *   where: {
     *     // ... the filter for the AuthLogs we want to count
     *   }
     * })
    **/
    count<T extends AuthLogCountArgs>(
      args?: Subset<T, AuthLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthLogAggregateArgs>(args: Subset<T, AuthLogAggregateArgs>): Prisma.PrismaPromise<GetAuthLogAggregateType<T>>

    /**
     * Group by AuthLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthLogGroupByArgs['orderBy'] }
        : { orderBy?: AuthLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthLog model
   */
  readonly fields: AuthLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuthLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuthLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthLog model
   */
  interface AuthLogFieldRefs {
    readonly id: FieldRef<"AuthLog", 'String'>
    readonly user_id: FieldRef<"AuthLog", 'String'>
    readonly event_type: FieldRef<"AuthLog", 'AuthEventType'>
    readonly status: FieldRef<"AuthLog", 'AuthEventStatus'>
    readonly ip_address: FieldRef<"AuthLog", 'String'>
    readonly user_agent: FieldRef<"AuthLog", 'String'>
    readonly details: FieldRef<"AuthLog", 'String'>
    readonly created_at: FieldRef<"AuthLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthLog findUnique
   */
  export type AuthLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLog
     */
    select?: AuthLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthLog
     */
    omit?: AuthLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthLog to fetch.
     */
    where: AuthLogWhereUniqueInput
  }

  /**
   * AuthLog findUniqueOrThrow
   */
  export type AuthLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLog
     */
    select?: AuthLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthLog
     */
    omit?: AuthLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthLog to fetch.
     */
    where: AuthLogWhereUniqueInput
  }

  /**
   * AuthLog findFirst
   */
  export type AuthLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLog
     */
    select?: AuthLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthLog
     */
    omit?: AuthLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthLog to fetch.
     */
    where?: AuthLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthLogs to fetch.
     */
    orderBy?: AuthLogOrderByWithRelationInput | AuthLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthLogs.
     */
    cursor?: AuthLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthLogs.
     */
    distinct?: AuthLogScalarFieldEnum | AuthLogScalarFieldEnum[]
  }

  /**
   * AuthLog findFirstOrThrow
   */
  export type AuthLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLog
     */
    select?: AuthLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthLog
     */
    omit?: AuthLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthLog to fetch.
     */
    where?: AuthLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthLogs to fetch.
     */
    orderBy?: AuthLogOrderByWithRelationInput | AuthLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthLogs.
     */
    cursor?: AuthLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthLogs.
     */
    distinct?: AuthLogScalarFieldEnum | AuthLogScalarFieldEnum[]
  }

  /**
   * AuthLog findMany
   */
  export type AuthLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLog
     */
    select?: AuthLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthLog
     */
    omit?: AuthLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthLogs to fetch.
     */
    where?: AuthLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthLogs to fetch.
     */
    orderBy?: AuthLogOrderByWithRelationInput | AuthLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthLogs.
     */
    cursor?: AuthLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthLogs.
     */
    skip?: number
    distinct?: AuthLogScalarFieldEnum | AuthLogScalarFieldEnum[]
  }

  /**
   * AuthLog create
   */
  export type AuthLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLog
     */
    select?: AuthLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthLog
     */
    omit?: AuthLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthLog.
     */
    data: XOR<AuthLogCreateInput, AuthLogUncheckedCreateInput>
  }

  /**
   * AuthLog createMany
   */
  export type AuthLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthLogs.
     */
    data: AuthLogCreateManyInput | AuthLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthLog update
   */
  export type AuthLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLog
     */
    select?: AuthLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthLog
     */
    omit?: AuthLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthLog.
     */
    data: XOR<AuthLogUpdateInput, AuthLogUncheckedUpdateInput>
    /**
     * Choose, which AuthLog to update.
     */
    where: AuthLogWhereUniqueInput
  }

  /**
   * AuthLog updateMany
   */
  export type AuthLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthLogs.
     */
    data: XOR<AuthLogUpdateManyMutationInput, AuthLogUncheckedUpdateManyInput>
    /**
     * Filter which AuthLogs to update
     */
    where?: AuthLogWhereInput
    /**
     * Limit how many AuthLogs to update.
     */
    limit?: number
  }

  /**
   * AuthLog upsert
   */
  export type AuthLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLog
     */
    select?: AuthLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthLog
     */
    omit?: AuthLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthLog to update in case it exists.
     */
    where: AuthLogWhereUniqueInput
    /**
     * In case the AuthLog found by the `where` argument doesn't exist, create a new AuthLog with this data.
     */
    create: XOR<AuthLogCreateInput, AuthLogUncheckedCreateInput>
    /**
     * In case the AuthLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthLogUpdateInput, AuthLogUncheckedUpdateInput>
  }

  /**
   * AuthLog delete
   */
  export type AuthLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLog
     */
    select?: AuthLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthLog
     */
    omit?: AuthLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLogInclude<ExtArgs> | null
    /**
     * Filter which AuthLog to delete.
     */
    where: AuthLogWhereUniqueInput
  }

  /**
   * AuthLog deleteMany
   */
  export type AuthLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthLogs to delete
     */
    where?: AuthLogWhereInput
    /**
     * Limit how many AuthLogs to delete.
     */
    limit?: number
  }

  /**
   * AuthLog.user
   */
  export type AuthLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuthLog without action
   */
  export type AuthLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLog
     */
    select?: AuthLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthLog
     */
    omit?: AuthLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLogInclude<ExtArgs> | null
  }


  /**
   * Model EmailVerification
   */

  export type AggregateEmailVerification = {
    _count: EmailVerificationCountAggregateOutputType | null
    _min: EmailVerificationMinAggregateOutputType | null
    _max: EmailVerificationMaxAggregateOutputType | null
  }

  export type EmailVerificationMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expires_at: Date | null
    created_at: Date | null
  }

  export type EmailVerificationMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    expires_at: Date | null
    created_at: Date | null
  }

  export type EmailVerificationCountAggregateOutputType = {
    id: number
    email: number
    token: number
    expires_at: number
    created_at: number
    _all: number
  }


  export type EmailVerificationMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires_at?: true
    created_at?: true
  }

  export type EmailVerificationMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires_at?: true
    created_at?: true
  }

  export type EmailVerificationCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    expires_at?: true
    created_at?: true
    _all?: true
  }

  export type EmailVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailVerification to aggregate.
     */
    where?: EmailVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerifications to fetch.
     */
    orderBy?: EmailVerificationOrderByWithRelationInput | EmailVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailVerifications
    **/
    _count?: true | EmailVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailVerificationMaxAggregateInputType
  }

  export type GetEmailVerificationAggregateType<T extends EmailVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailVerification[P]>
      : GetScalarType<T[P], AggregateEmailVerification[P]>
  }




  export type EmailVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailVerificationWhereInput
    orderBy?: EmailVerificationOrderByWithAggregationInput | EmailVerificationOrderByWithAggregationInput[]
    by: EmailVerificationScalarFieldEnum[] | EmailVerificationScalarFieldEnum
    having?: EmailVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailVerificationCountAggregateInputType | true
    _min?: EmailVerificationMinAggregateInputType
    _max?: EmailVerificationMaxAggregateInputType
  }

  export type EmailVerificationGroupByOutputType = {
    id: string
    email: string
    token: string
    expires_at: Date
    created_at: Date
    _count: EmailVerificationCountAggregateOutputType | null
    _min: EmailVerificationMinAggregateOutputType | null
    _max: EmailVerificationMaxAggregateOutputType | null
  }

  type GetEmailVerificationGroupByPayload<T extends EmailVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], EmailVerificationGroupByOutputType[P]>
        }
      >
    >


  export type EmailVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    expires_at?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["emailVerification"]>



  export type EmailVerificationSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    expires_at?: boolean
    created_at?: boolean
  }

  export type EmailVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token" | "expires_at" | "created_at", ExtArgs["result"]["emailVerification"]>

  export type $EmailVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailVerification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      expires_at: Date
      created_at: Date
    }, ExtArgs["result"]["emailVerification"]>
    composites: {}
  }

  type EmailVerificationGetPayload<S extends boolean | null | undefined | EmailVerificationDefaultArgs> = $Result.GetResult<Prisma.$EmailVerificationPayload, S>

  type EmailVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailVerificationCountAggregateInputType | true
    }

  export interface EmailVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailVerification'], meta: { name: 'EmailVerification' } }
    /**
     * Find zero or one EmailVerification that matches the filter.
     * @param {EmailVerificationFindUniqueArgs} args - Arguments to find a EmailVerification
     * @example
     * // Get one EmailVerification
     * const emailVerification = await prisma.emailVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailVerificationFindUniqueArgs>(args: SelectSubset<T, EmailVerificationFindUniqueArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailVerificationFindUniqueOrThrowArgs} args - Arguments to find a EmailVerification
     * @example
     * // Get one EmailVerification
     * const emailVerification = await prisma.emailVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationFindFirstArgs} args - Arguments to find a EmailVerification
     * @example
     * // Get one EmailVerification
     * const emailVerification = await prisma.emailVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailVerificationFindFirstArgs>(args?: SelectSubset<T, EmailVerificationFindFirstArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationFindFirstOrThrowArgs} args - Arguments to find a EmailVerification
     * @example
     * // Get one EmailVerification
     * const emailVerification = await prisma.emailVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailVerifications
     * const emailVerifications = await prisma.emailVerification.findMany()
     * 
     * // Get first 10 EmailVerifications
     * const emailVerifications = await prisma.emailVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailVerificationWithIdOnly = await prisma.emailVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailVerificationFindManyArgs>(args?: SelectSubset<T, EmailVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailVerification.
     * @param {EmailVerificationCreateArgs} args - Arguments to create a EmailVerification.
     * @example
     * // Create one EmailVerification
     * const EmailVerification = await prisma.emailVerification.create({
     *   data: {
     *     // ... data to create a EmailVerification
     *   }
     * })
     * 
     */
    create<T extends EmailVerificationCreateArgs>(args: SelectSubset<T, EmailVerificationCreateArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailVerifications.
     * @param {EmailVerificationCreateManyArgs} args - Arguments to create many EmailVerifications.
     * @example
     * // Create many EmailVerifications
     * const emailVerification = await prisma.emailVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailVerificationCreateManyArgs>(args?: SelectSubset<T, EmailVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EmailVerification.
     * @param {EmailVerificationDeleteArgs} args - Arguments to delete one EmailVerification.
     * @example
     * // Delete one EmailVerification
     * const EmailVerification = await prisma.emailVerification.delete({
     *   where: {
     *     // ... filter to delete one EmailVerification
     *   }
     * })
     * 
     */
    delete<T extends EmailVerificationDeleteArgs>(args: SelectSubset<T, EmailVerificationDeleteArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailVerification.
     * @param {EmailVerificationUpdateArgs} args - Arguments to update one EmailVerification.
     * @example
     * // Update one EmailVerification
     * const emailVerification = await prisma.emailVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailVerificationUpdateArgs>(args: SelectSubset<T, EmailVerificationUpdateArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailVerifications.
     * @param {EmailVerificationDeleteManyArgs} args - Arguments to filter EmailVerifications to delete.
     * @example
     * // Delete a few EmailVerifications
     * const { count } = await prisma.emailVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailVerificationDeleteManyArgs>(args?: SelectSubset<T, EmailVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailVerifications
     * const emailVerification = await prisma.emailVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailVerificationUpdateManyArgs>(args: SelectSubset<T, EmailVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmailVerification.
     * @param {EmailVerificationUpsertArgs} args - Arguments to update or create a EmailVerification.
     * @example
     * // Update or create a EmailVerification
     * const emailVerification = await prisma.emailVerification.upsert({
     *   create: {
     *     // ... data to create a EmailVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailVerification we want to update
     *   }
     * })
     */
    upsert<T extends EmailVerificationUpsertArgs>(args: SelectSubset<T, EmailVerificationUpsertArgs<ExtArgs>>): Prisma__EmailVerificationClient<$Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationCountArgs} args - Arguments to filter EmailVerifications to count.
     * @example
     * // Count the number of EmailVerifications
     * const count = await prisma.emailVerification.count({
     *   where: {
     *     // ... the filter for the EmailVerifications we want to count
     *   }
     * })
    **/
    count<T extends EmailVerificationCountArgs>(
      args?: Subset<T, EmailVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailVerificationAggregateArgs>(args: Subset<T, EmailVerificationAggregateArgs>): Prisma.PrismaPromise<GetEmailVerificationAggregateType<T>>

    /**
     * Group by EmailVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailVerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailVerificationGroupByArgs['orderBy'] }
        : { orderBy?: EmailVerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailVerification model
   */
  readonly fields: EmailVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailVerification model
   */
  interface EmailVerificationFieldRefs {
    readonly id: FieldRef<"EmailVerification", 'String'>
    readonly email: FieldRef<"EmailVerification", 'String'>
    readonly token: FieldRef<"EmailVerification", 'String'>
    readonly expires_at: FieldRef<"EmailVerification", 'DateTime'>
    readonly created_at: FieldRef<"EmailVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailVerification findUnique
   */
  export type EmailVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Filter, which EmailVerification to fetch.
     */
    where: EmailVerificationWhereUniqueInput
  }

  /**
   * EmailVerification findUniqueOrThrow
   */
  export type EmailVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Filter, which EmailVerification to fetch.
     */
    where: EmailVerificationWhereUniqueInput
  }

  /**
   * EmailVerification findFirst
   */
  export type EmailVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Filter, which EmailVerification to fetch.
     */
    where?: EmailVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerifications to fetch.
     */
    orderBy?: EmailVerificationOrderByWithRelationInput | EmailVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailVerifications.
     */
    cursor?: EmailVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailVerifications.
     */
    distinct?: EmailVerificationScalarFieldEnum | EmailVerificationScalarFieldEnum[]
  }

  /**
   * EmailVerification findFirstOrThrow
   */
  export type EmailVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Filter, which EmailVerification to fetch.
     */
    where?: EmailVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerifications to fetch.
     */
    orderBy?: EmailVerificationOrderByWithRelationInput | EmailVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailVerifications.
     */
    cursor?: EmailVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailVerifications.
     */
    distinct?: EmailVerificationScalarFieldEnum | EmailVerificationScalarFieldEnum[]
  }

  /**
   * EmailVerification findMany
   */
  export type EmailVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Filter, which EmailVerifications to fetch.
     */
    where?: EmailVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailVerifications to fetch.
     */
    orderBy?: EmailVerificationOrderByWithRelationInput | EmailVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailVerifications.
     */
    cursor?: EmailVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailVerifications.
     */
    skip?: number
    distinct?: EmailVerificationScalarFieldEnum | EmailVerificationScalarFieldEnum[]
  }

  /**
   * EmailVerification create
   */
  export type EmailVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a EmailVerification.
     */
    data: XOR<EmailVerificationCreateInput, EmailVerificationUncheckedCreateInput>
  }

  /**
   * EmailVerification createMany
   */
  export type EmailVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailVerifications.
     */
    data: EmailVerificationCreateManyInput | EmailVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailVerification update
   */
  export type EmailVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a EmailVerification.
     */
    data: XOR<EmailVerificationUpdateInput, EmailVerificationUncheckedUpdateInput>
    /**
     * Choose, which EmailVerification to update.
     */
    where: EmailVerificationWhereUniqueInput
  }

  /**
   * EmailVerification updateMany
   */
  export type EmailVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailVerifications.
     */
    data: XOR<EmailVerificationUpdateManyMutationInput, EmailVerificationUncheckedUpdateManyInput>
    /**
     * Filter which EmailVerifications to update
     */
    where?: EmailVerificationWhereInput
    /**
     * Limit how many EmailVerifications to update.
     */
    limit?: number
  }

  /**
   * EmailVerification upsert
   */
  export type EmailVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the EmailVerification to update in case it exists.
     */
    where: EmailVerificationWhereUniqueInput
    /**
     * In case the EmailVerification found by the `where` argument doesn't exist, create a new EmailVerification with this data.
     */
    create: XOR<EmailVerificationCreateInput, EmailVerificationUncheckedCreateInput>
    /**
     * In case the EmailVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailVerificationUpdateInput, EmailVerificationUncheckedUpdateInput>
  }

  /**
   * EmailVerification delete
   */
  export type EmailVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
    /**
     * Filter which EmailVerification to delete.
     */
    where: EmailVerificationWhereUniqueInput
  }

  /**
   * EmailVerification deleteMany
   */
  export type EmailVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailVerifications to delete
     */
    where?: EmailVerificationWhereInput
    /**
     * Limit how many EmailVerifications to delete.
     */
    limit?: number
  }

  /**
   * EmailVerification without action
   */
  export type EmailVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerification
     */
    select?: EmailVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailVerification
     */
    omit?: EmailVerificationOmit<ExtArgs> | null
  }


  /**
   * Model PasswordReset
   */

  export type AggregatePasswordReset = {
    _count: PasswordResetCountAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  export type PasswordResetMinAggregateOutputType = {
    id: string | null
    app_user_id: string | null
    token: string | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    used: boolean | null
  }

  export type PasswordResetMaxAggregateOutputType = {
    id: string | null
    app_user_id: string | null
    token: string | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    used: boolean | null
  }

  export type PasswordResetCountAggregateOutputType = {
    id: number
    app_user_id: number
    token: number
    expires_at: number
    created_at: number
    updated_at: number
    used: number
    _all: number
  }


  export type PasswordResetMinAggregateInputType = {
    id?: true
    app_user_id?: true
    token?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    used?: true
  }

  export type PasswordResetMaxAggregateInputType = {
    id?: true
    app_user_id?: true
    token?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    used?: true
  }

  export type PasswordResetCountAggregateInputType = {
    id?: true
    app_user_id?: true
    token?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    used?: true
    _all?: true
  }

  export type PasswordResetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordReset to aggregate.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResets
    **/
    _count?: true | PasswordResetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetMaxAggregateInputType
  }

  export type GetPasswordResetAggregateType<T extends PasswordResetAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordReset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordReset[P]>
      : GetScalarType<T[P], AggregatePasswordReset[P]>
  }




  export type PasswordResetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetWhereInput
    orderBy?: PasswordResetOrderByWithAggregationInput | PasswordResetOrderByWithAggregationInput[]
    by: PasswordResetScalarFieldEnum[] | PasswordResetScalarFieldEnum
    having?: PasswordResetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetCountAggregateInputType | true
    _min?: PasswordResetMinAggregateInputType
    _max?: PasswordResetMaxAggregateInputType
  }

  export type PasswordResetGroupByOutputType = {
    id: string
    app_user_id: string
    token: string
    expires_at: Date
    created_at: Date
    updated_at: Date
    used: boolean
    _count: PasswordResetCountAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  type GetPasswordResetGroupByPayload<T extends PasswordResetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_user_id?: boolean
    token?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    used?: boolean
    app_user?: boolean | AppUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>



  export type PasswordResetSelectScalar = {
    id?: boolean
    app_user_id?: boolean
    token?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    used?: boolean
  }

  export type PasswordResetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "app_user_id" | "token" | "expires_at" | "created_at" | "updated_at" | "used", ExtArgs["result"]["passwordReset"]>
  export type PasswordResetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app_user?: boolean | AppUserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordReset"
    objects: {
      app_user: Prisma.$AppUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      app_user_id: string
      token: string
      expires_at: Date
      created_at: Date
      updated_at: Date
      used: boolean
    }, ExtArgs["result"]["passwordReset"]>
    composites: {}
  }

  type PasswordResetGetPayload<S extends boolean | null | undefined | PasswordResetDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetPayload, S>

  type PasswordResetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetCountAggregateInputType | true
    }

  export interface PasswordResetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordReset'], meta: { name: 'PasswordReset' } }
    /**
     * Find zero or one PasswordReset that matches the filter.
     * @param {PasswordResetFindUniqueArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetFindUniqueArgs>(args: SelectSubset<T, PasswordResetFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordReset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetFindUniqueOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetFindFirstArgs>(args?: SelectSubset<T, PasswordResetFindFirstArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany()
     * 
     * // Get first 10 PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetFindManyArgs>(args?: SelectSubset<T, PasswordResetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordReset.
     * @param {PasswordResetCreateArgs} args - Arguments to create a PasswordReset.
     * @example
     * // Create one PasswordReset
     * const PasswordReset = await prisma.passwordReset.create({
     *   data: {
     *     // ... data to create a PasswordReset
     *   }
     * })
     * 
     */
    create<T extends PasswordResetCreateArgs>(args: SelectSubset<T, PasswordResetCreateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResets.
     * @param {PasswordResetCreateManyArgs} args - Arguments to create many PasswordResets.
     * @example
     * // Create many PasswordResets
     * const passwordReset = await prisma.passwordReset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetCreateManyArgs>(args?: SelectSubset<T, PasswordResetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PasswordReset.
     * @param {PasswordResetDeleteArgs} args - Arguments to delete one PasswordReset.
     * @example
     * // Delete one PasswordReset
     * const PasswordReset = await prisma.passwordReset.delete({
     *   where: {
     *     // ... filter to delete one PasswordReset
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetDeleteArgs>(args: SelectSubset<T, PasswordResetDeleteArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordReset.
     * @param {PasswordResetUpdateArgs} args - Arguments to update one PasswordReset.
     * @example
     * // Update one PasswordReset
     * const passwordReset = await prisma.passwordReset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetUpdateArgs>(args: SelectSubset<T, PasswordResetUpdateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResets.
     * @param {PasswordResetDeleteManyArgs} args - Arguments to filter PasswordResets to delete.
     * @example
     * // Delete a few PasswordResets
     * const { count } = await prisma.passwordReset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetDeleteManyArgs>(args?: SelectSubset<T, PasswordResetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResets
     * const passwordReset = await prisma.passwordReset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetUpdateManyArgs>(args: SelectSubset<T, PasswordResetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PasswordReset.
     * @param {PasswordResetUpsertArgs} args - Arguments to update or create a PasswordReset.
     * @example
     * // Update or create a PasswordReset
     * const passwordReset = await prisma.passwordReset.upsert({
     *   create: {
     *     // ... data to create a PasswordReset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordReset we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetUpsertArgs>(args: SelectSubset<T, PasswordResetUpsertArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetCountArgs} args - Arguments to filter PasswordResets to count.
     * @example
     * // Count the number of PasswordResets
     * const count = await prisma.passwordReset.count({
     *   where: {
     *     // ... the filter for the PasswordResets we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetCountArgs>(
      args?: Subset<T, PasswordResetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetAggregateArgs>(args: Subset<T, PasswordResetAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetAggregateType<T>>

    /**
     * Group by PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordReset model
   */
  readonly fields: PasswordResetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordReset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    app_user<T extends AppUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppUserDefaultArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordReset model
   */
  interface PasswordResetFieldRefs {
    readonly id: FieldRef<"PasswordReset", 'String'>
    readonly app_user_id: FieldRef<"PasswordReset", 'String'>
    readonly token: FieldRef<"PasswordReset", 'String'>
    readonly expires_at: FieldRef<"PasswordReset", 'DateTime'>
    readonly created_at: FieldRef<"PasswordReset", 'DateTime'>
    readonly updated_at: FieldRef<"PasswordReset", 'DateTime'>
    readonly used: FieldRef<"PasswordReset", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * PasswordReset findUnique
   */
  export type PasswordResetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findUniqueOrThrow
   */
  export type PasswordResetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findFirst
   */
  export type PasswordResetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findFirstOrThrow
   */
  export type PasswordResetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findMany
   */
  export type PasswordResetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResets to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset create
   */
  export type PasswordResetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordReset.
     */
    data: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
  }

  /**
   * PasswordReset createMany
   */
  export type PasswordResetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResets.
     */
    data: PasswordResetCreateManyInput | PasswordResetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordReset update
   */
  export type PasswordResetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordReset.
     */
    data: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
    /**
     * Choose, which PasswordReset to update.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset updateMany
   */
  export type PasswordResetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResets.
     */
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResets to update
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to update.
     */
    limit?: number
  }

  /**
   * PasswordReset upsert
   */
  export type PasswordResetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordReset to update in case it exists.
     */
    where: PasswordResetWhereUniqueInput
    /**
     * In case the PasswordReset found by the `where` argument doesn't exist, create a new PasswordReset with this data.
     */
    create: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
    /**
     * In case the PasswordReset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
  }

  /**
   * PasswordReset delete
   */
  export type PasswordResetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter which PasswordReset to delete.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset deleteMany
   */
  export type PasswordResetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResets to delete
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to delete.
     */
    limit?: number
  }

  /**
   * PasswordReset without action
   */
  export type PasswordResetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
  }


  /**
   * Model AuthEvent
   */

  export type AggregateAuthEvent = {
    _count: AuthEventCountAggregateOutputType | null
    _min: AuthEventMinAggregateOutputType | null
    _max: AuthEventMaxAggregateOutputType | null
  }

  export type AuthEventMinAggregateOutputType = {
    id: string | null
    app_user_id: string | null
    event_type: string | null
    ip_address: string | null
    user_agent: string | null
    details: string | null
    created_at: Date | null
  }

  export type AuthEventMaxAggregateOutputType = {
    id: string | null
    app_user_id: string | null
    event_type: string | null
    ip_address: string | null
    user_agent: string | null
    details: string | null
    created_at: Date | null
  }

  export type AuthEventCountAggregateOutputType = {
    id: number
    app_user_id: number
    event_type: number
    ip_address: number
    user_agent: number
    details: number
    created_at: number
    _all: number
  }


  export type AuthEventMinAggregateInputType = {
    id?: true
    app_user_id?: true
    event_type?: true
    ip_address?: true
    user_agent?: true
    details?: true
    created_at?: true
  }

  export type AuthEventMaxAggregateInputType = {
    id?: true
    app_user_id?: true
    event_type?: true
    ip_address?: true
    user_agent?: true
    details?: true
    created_at?: true
  }

  export type AuthEventCountAggregateInputType = {
    id?: true
    app_user_id?: true
    event_type?: true
    ip_address?: true
    user_agent?: true
    details?: true
    created_at?: true
    _all?: true
  }

  export type AuthEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthEvent to aggregate.
     */
    where?: AuthEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthEvents to fetch.
     */
    orderBy?: AuthEventOrderByWithRelationInput | AuthEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthEvents
    **/
    _count?: true | AuthEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthEventMaxAggregateInputType
  }

  export type GetAuthEventAggregateType<T extends AuthEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthEvent[P]>
      : GetScalarType<T[P], AggregateAuthEvent[P]>
  }




  export type AuthEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthEventWhereInput
    orderBy?: AuthEventOrderByWithAggregationInput | AuthEventOrderByWithAggregationInput[]
    by: AuthEventScalarFieldEnum[] | AuthEventScalarFieldEnum
    having?: AuthEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthEventCountAggregateInputType | true
    _min?: AuthEventMinAggregateInputType
    _max?: AuthEventMaxAggregateInputType
  }

  export type AuthEventGroupByOutputType = {
    id: string
    app_user_id: string
    event_type: string
    ip_address: string | null
    user_agent: string | null
    details: string | null
    created_at: Date
    _count: AuthEventCountAggregateOutputType | null
    _min: AuthEventMinAggregateOutputType | null
    _max: AuthEventMaxAggregateOutputType | null
  }

  type GetAuthEventGroupByPayload<T extends AuthEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthEventGroupByOutputType[P]>
            : GetScalarType<T[P], AuthEventGroupByOutputType[P]>
        }
      >
    >


  export type AuthEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_user_id?: boolean
    event_type?: boolean
    ip_address?: boolean
    user_agent?: boolean
    details?: boolean
    created_at?: boolean
    app_user?: boolean | AppUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authEvent"]>



  export type AuthEventSelectScalar = {
    id?: boolean
    app_user_id?: boolean
    event_type?: boolean
    ip_address?: boolean
    user_agent?: boolean
    details?: boolean
    created_at?: boolean
  }

  export type AuthEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "app_user_id" | "event_type" | "ip_address" | "user_agent" | "details" | "created_at", ExtArgs["result"]["authEvent"]>
  export type AuthEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app_user?: boolean | AppUserDefaultArgs<ExtArgs>
  }

  export type $AuthEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthEvent"
    objects: {
      app_user: Prisma.$AppUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      app_user_id: string
      event_type: string
      ip_address: string | null
      user_agent: string | null
      details: string | null
      created_at: Date
    }, ExtArgs["result"]["authEvent"]>
    composites: {}
  }

  type AuthEventGetPayload<S extends boolean | null | undefined | AuthEventDefaultArgs> = $Result.GetResult<Prisma.$AuthEventPayload, S>

  type AuthEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthEventCountAggregateInputType | true
    }

  export interface AuthEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthEvent'], meta: { name: 'AuthEvent' } }
    /**
     * Find zero or one AuthEvent that matches the filter.
     * @param {AuthEventFindUniqueArgs} args - Arguments to find a AuthEvent
     * @example
     * // Get one AuthEvent
     * const authEvent = await prisma.authEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthEventFindUniqueArgs>(args: SelectSubset<T, AuthEventFindUniqueArgs<ExtArgs>>): Prisma__AuthEventClient<$Result.GetResult<Prisma.$AuthEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthEventFindUniqueOrThrowArgs} args - Arguments to find a AuthEvent
     * @example
     * // Get one AuthEvent
     * const authEvent = await prisma.authEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthEventClient<$Result.GetResult<Prisma.$AuthEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthEventFindFirstArgs} args - Arguments to find a AuthEvent
     * @example
     * // Get one AuthEvent
     * const authEvent = await prisma.authEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthEventFindFirstArgs>(args?: SelectSubset<T, AuthEventFindFirstArgs<ExtArgs>>): Prisma__AuthEventClient<$Result.GetResult<Prisma.$AuthEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthEventFindFirstOrThrowArgs} args - Arguments to find a AuthEvent
     * @example
     * // Get one AuthEvent
     * const authEvent = await prisma.authEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthEventClient<$Result.GetResult<Prisma.$AuthEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthEvents
     * const authEvents = await prisma.authEvent.findMany()
     * 
     * // Get first 10 AuthEvents
     * const authEvents = await prisma.authEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authEventWithIdOnly = await prisma.authEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthEventFindManyArgs>(args?: SelectSubset<T, AuthEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthEvent.
     * @param {AuthEventCreateArgs} args - Arguments to create a AuthEvent.
     * @example
     * // Create one AuthEvent
     * const AuthEvent = await prisma.authEvent.create({
     *   data: {
     *     // ... data to create a AuthEvent
     *   }
     * })
     * 
     */
    create<T extends AuthEventCreateArgs>(args: SelectSubset<T, AuthEventCreateArgs<ExtArgs>>): Prisma__AuthEventClient<$Result.GetResult<Prisma.$AuthEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthEvents.
     * @param {AuthEventCreateManyArgs} args - Arguments to create many AuthEvents.
     * @example
     * // Create many AuthEvents
     * const authEvent = await prisma.authEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthEventCreateManyArgs>(args?: SelectSubset<T, AuthEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AuthEvent.
     * @param {AuthEventDeleteArgs} args - Arguments to delete one AuthEvent.
     * @example
     * // Delete one AuthEvent
     * const AuthEvent = await prisma.authEvent.delete({
     *   where: {
     *     // ... filter to delete one AuthEvent
     *   }
     * })
     * 
     */
    delete<T extends AuthEventDeleteArgs>(args: SelectSubset<T, AuthEventDeleteArgs<ExtArgs>>): Prisma__AuthEventClient<$Result.GetResult<Prisma.$AuthEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthEvent.
     * @param {AuthEventUpdateArgs} args - Arguments to update one AuthEvent.
     * @example
     * // Update one AuthEvent
     * const authEvent = await prisma.authEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthEventUpdateArgs>(args: SelectSubset<T, AuthEventUpdateArgs<ExtArgs>>): Prisma__AuthEventClient<$Result.GetResult<Prisma.$AuthEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthEvents.
     * @param {AuthEventDeleteManyArgs} args - Arguments to filter AuthEvents to delete.
     * @example
     * // Delete a few AuthEvents
     * const { count } = await prisma.authEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthEventDeleteManyArgs>(args?: SelectSubset<T, AuthEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthEvents
     * const authEvent = await prisma.authEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthEventUpdateManyArgs>(args: SelectSubset<T, AuthEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthEvent.
     * @param {AuthEventUpsertArgs} args - Arguments to update or create a AuthEvent.
     * @example
     * // Update or create a AuthEvent
     * const authEvent = await prisma.authEvent.upsert({
     *   create: {
     *     // ... data to create a AuthEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthEvent we want to update
     *   }
     * })
     */
    upsert<T extends AuthEventUpsertArgs>(args: SelectSubset<T, AuthEventUpsertArgs<ExtArgs>>): Prisma__AuthEventClient<$Result.GetResult<Prisma.$AuthEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthEventCountArgs} args - Arguments to filter AuthEvents to count.
     * @example
     * // Count the number of AuthEvents
     * const count = await prisma.authEvent.count({
     *   where: {
     *     // ... the filter for the AuthEvents we want to count
     *   }
     * })
    **/
    count<T extends AuthEventCountArgs>(
      args?: Subset<T, AuthEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthEventAggregateArgs>(args: Subset<T, AuthEventAggregateArgs>): Prisma.PrismaPromise<GetAuthEventAggregateType<T>>

    /**
     * Group by AuthEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthEventGroupByArgs['orderBy'] }
        : { orderBy?: AuthEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthEvent model
   */
  readonly fields: AuthEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    app_user<T extends AppUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppUserDefaultArgs<ExtArgs>>): Prisma__AppUserClient<$Result.GetResult<Prisma.$AppUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthEvent model
   */
  interface AuthEventFieldRefs {
    readonly id: FieldRef<"AuthEvent", 'String'>
    readonly app_user_id: FieldRef<"AuthEvent", 'String'>
    readonly event_type: FieldRef<"AuthEvent", 'String'>
    readonly ip_address: FieldRef<"AuthEvent", 'String'>
    readonly user_agent: FieldRef<"AuthEvent", 'String'>
    readonly details: FieldRef<"AuthEvent", 'String'>
    readonly created_at: FieldRef<"AuthEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthEvent findUnique
   */
  export type AuthEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthEvent
     */
    select?: AuthEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthEvent
     */
    omit?: AuthEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthEventInclude<ExtArgs> | null
    /**
     * Filter, which AuthEvent to fetch.
     */
    where: AuthEventWhereUniqueInput
  }

  /**
   * AuthEvent findUniqueOrThrow
   */
  export type AuthEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthEvent
     */
    select?: AuthEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthEvent
     */
    omit?: AuthEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthEventInclude<ExtArgs> | null
    /**
     * Filter, which AuthEvent to fetch.
     */
    where: AuthEventWhereUniqueInput
  }

  /**
   * AuthEvent findFirst
   */
  export type AuthEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthEvent
     */
    select?: AuthEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthEvent
     */
    omit?: AuthEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthEventInclude<ExtArgs> | null
    /**
     * Filter, which AuthEvent to fetch.
     */
    where?: AuthEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthEvents to fetch.
     */
    orderBy?: AuthEventOrderByWithRelationInput | AuthEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthEvents.
     */
    cursor?: AuthEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthEvents.
     */
    distinct?: AuthEventScalarFieldEnum | AuthEventScalarFieldEnum[]
  }

  /**
   * AuthEvent findFirstOrThrow
   */
  export type AuthEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthEvent
     */
    select?: AuthEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthEvent
     */
    omit?: AuthEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthEventInclude<ExtArgs> | null
    /**
     * Filter, which AuthEvent to fetch.
     */
    where?: AuthEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthEvents to fetch.
     */
    orderBy?: AuthEventOrderByWithRelationInput | AuthEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthEvents.
     */
    cursor?: AuthEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthEvents.
     */
    distinct?: AuthEventScalarFieldEnum | AuthEventScalarFieldEnum[]
  }

  /**
   * AuthEvent findMany
   */
  export type AuthEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthEvent
     */
    select?: AuthEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthEvent
     */
    omit?: AuthEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthEventInclude<ExtArgs> | null
    /**
     * Filter, which AuthEvents to fetch.
     */
    where?: AuthEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthEvents to fetch.
     */
    orderBy?: AuthEventOrderByWithRelationInput | AuthEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthEvents.
     */
    cursor?: AuthEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthEvents.
     */
    skip?: number
    distinct?: AuthEventScalarFieldEnum | AuthEventScalarFieldEnum[]
  }

  /**
   * AuthEvent create
   */
  export type AuthEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthEvent
     */
    select?: AuthEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthEvent
     */
    omit?: AuthEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthEventInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthEvent.
     */
    data: XOR<AuthEventCreateInput, AuthEventUncheckedCreateInput>
  }

  /**
   * AuthEvent createMany
   */
  export type AuthEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthEvents.
     */
    data: AuthEventCreateManyInput | AuthEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthEvent update
   */
  export type AuthEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthEvent
     */
    select?: AuthEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthEvent
     */
    omit?: AuthEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthEventInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthEvent.
     */
    data: XOR<AuthEventUpdateInput, AuthEventUncheckedUpdateInput>
    /**
     * Choose, which AuthEvent to update.
     */
    where: AuthEventWhereUniqueInput
  }

  /**
   * AuthEvent updateMany
   */
  export type AuthEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthEvents.
     */
    data: XOR<AuthEventUpdateManyMutationInput, AuthEventUncheckedUpdateManyInput>
    /**
     * Filter which AuthEvents to update
     */
    where?: AuthEventWhereInput
    /**
     * Limit how many AuthEvents to update.
     */
    limit?: number
  }

  /**
   * AuthEvent upsert
   */
  export type AuthEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthEvent
     */
    select?: AuthEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthEvent
     */
    omit?: AuthEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthEventInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthEvent to update in case it exists.
     */
    where: AuthEventWhereUniqueInput
    /**
     * In case the AuthEvent found by the `where` argument doesn't exist, create a new AuthEvent with this data.
     */
    create: XOR<AuthEventCreateInput, AuthEventUncheckedCreateInput>
    /**
     * In case the AuthEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthEventUpdateInput, AuthEventUncheckedUpdateInput>
  }

  /**
   * AuthEvent delete
   */
  export type AuthEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthEvent
     */
    select?: AuthEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthEvent
     */
    omit?: AuthEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthEventInclude<ExtArgs> | null
    /**
     * Filter which AuthEvent to delete.
     */
    where: AuthEventWhereUniqueInput
  }

  /**
   * AuthEvent deleteMany
   */
  export type AuthEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthEvents to delete
     */
    where?: AuthEventWhereInput
    /**
     * Limit how many AuthEvents to delete.
     */
    limit?: number
  }

  /**
   * AuthEvent without action
   */
  export type AuthEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthEvent
     */
    select?: AuthEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthEvent
     */
    omit?: AuthEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthEventInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AppUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    password_hash: 'password_hash',
    name: 'name',
    company_name: 'company_name',
    phone: 'phone',
    website: 'website',
    active: 'active',
    created_at: 'created_at',
    updated_at: 'updated_at',
    email_verified: 'email_verified',
    email_verified_at: 'email_verified_at',
    reset_token: 'reset_token',
    reset_token_expires: 'reset_token_expires'
  };

  export type AppUserScalarFieldEnum = (typeof AppUserScalarFieldEnum)[keyof typeof AppUserScalarFieldEnum]


  export const ApiKeyScalarFieldEnum: {
    id: 'id',
    app_user_id: 'app_user_id',
    key: 'key',
    name: 'name',
    active: 'active',
    created_at: 'created_at',
    updated_at: 'updated_at',
    last_used_at: 'last_used_at',
    expires_at: 'expires_at'
  };

  export type ApiKeyScalarFieldEnum = (typeof ApiKeyScalarFieldEnum)[keyof typeof ApiKeyScalarFieldEnum]


  export const AppSessionScalarFieldEnum: {
    id: 'id',
    app_user_id: 'app_user_id',
    token: 'token',
    refresh_token: 'refresh_token',
    ip_address: 'ip_address',
    user_agent: 'user_agent',
    expires_at: 'expires_at',
    created_at: 'created_at',
    updated_at: 'updated_at',
    revoked: 'revoked',
    revoked_at: 'revoked_at'
  };

  export type AppSessionScalarFieldEnum = (typeof AppSessionScalarFieldEnum)[keyof typeof AppSessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    api_key_id: 'api_key_id',
    email: 'email',
    username: 'username',
    password_hash: 'password_hash',
    name: 'name',
    active: 'active',
    created_at: 'created_at',
    updated_at: 'updated_at',
    email_verified: 'email_verified',
    email_verified_at: 'email_verified_at',
    reset_token: 'reset_token',
    reset_token_expires: 'reset_token_expires',
    ip_address: 'ip_address',
    user_agent: 'user_agent'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    name: 'name',
    api_key: 'api_key',
    active: 'active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const UserAccountScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    account_id: 'account_id',
    created_at: 'created_at',
    created_by: 'created_by'
  };

  export type UserAccountScalarFieldEnum = (typeof UserAccountScalarFieldEnum)[keyof typeof UserAccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    token: 'token',
    refresh_token: 'refresh_token',
    ip_address: 'ip_address',
    user_agent: 'user_agent',
    expires_at: 'expires_at',
    created_at: 'created_at',
    updated_at: 'updated_at',
    revoked: 'revoked',
    revoked_at: 'revoked_at'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AuthLogScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    event_type: 'event_type',
    status: 'status',
    ip_address: 'ip_address',
    user_agent: 'user_agent',
    details: 'details',
    created_at: 'created_at'
  };

  export type AuthLogScalarFieldEnum = (typeof AuthLogScalarFieldEnum)[keyof typeof AuthLogScalarFieldEnum]


  export const EmailVerificationScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    expires_at: 'expires_at',
    created_at: 'created_at'
  };

  export type EmailVerificationScalarFieldEnum = (typeof EmailVerificationScalarFieldEnum)[keyof typeof EmailVerificationScalarFieldEnum]


  export const PasswordResetScalarFieldEnum: {
    id: 'id',
    app_user_id: 'app_user_id',
    token: 'token',
    expires_at: 'expires_at',
    created_at: 'created_at',
    updated_at: 'updated_at',
    used: 'used'
  };

  export type PasswordResetScalarFieldEnum = (typeof PasswordResetScalarFieldEnum)[keyof typeof PasswordResetScalarFieldEnum]


  export const AuthEventScalarFieldEnum: {
    id: 'id',
    app_user_id: 'app_user_id',
    event_type: 'event_type',
    ip_address: 'ip_address',
    user_agent: 'user_agent',
    details: 'details',
    created_at: 'created_at'
  };

  export type AuthEventScalarFieldEnum = (typeof AuthEventScalarFieldEnum)[keyof typeof AuthEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const AppUserOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    password_hash: 'password_hash',
    name: 'name',
    company_name: 'company_name',
    phone: 'phone',
    website: 'website',
    reset_token: 'reset_token'
  };

  export type AppUserOrderByRelevanceFieldEnum = (typeof AppUserOrderByRelevanceFieldEnum)[keyof typeof AppUserOrderByRelevanceFieldEnum]


  export const ApiKeyOrderByRelevanceFieldEnum: {
    id: 'id',
    app_user_id: 'app_user_id',
    key: 'key',
    name: 'name'
  };

  export type ApiKeyOrderByRelevanceFieldEnum = (typeof ApiKeyOrderByRelevanceFieldEnum)[keyof typeof ApiKeyOrderByRelevanceFieldEnum]


  export const AppSessionOrderByRelevanceFieldEnum: {
    id: 'id',
    app_user_id: 'app_user_id',
    token: 'token',
    refresh_token: 'refresh_token',
    ip_address: 'ip_address',
    user_agent: 'user_agent'
  };

  export type AppSessionOrderByRelevanceFieldEnum = (typeof AppSessionOrderByRelevanceFieldEnum)[keyof typeof AppSessionOrderByRelevanceFieldEnum]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    api_key_id: 'api_key_id',
    email: 'email',
    username: 'username',
    password_hash: 'password_hash',
    name: 'name',
    reset_token: 'reset_token',
    ip_address: 'ip_address',
    user_agent: 'user_agent'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const AccountOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    api_key: 'api_key'
  };

  export type AccountOrderByRelevanceFieldEnum = (typeof AccountOrderByRelevanceFieldEnum)[keyof typeof AccountOrderByRelevanceFieldEnum]


  export const UserAccountOrderByRelevanceFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    account_id: 'account_id',
    created_by: 'created_by'
  };

  export type UserAccountOrderByRelevanceFieldEnum = (typeof UserAccountOrderByRelevanceFieldEnum)[keyof typeof UserAccountOrderByRelevanceFieldEnum]


  export const SessionOrderByRelevanceFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    token: 'token',
    refresh_token: 'refresh_token',
    ip_address: 'ip_address',
    user_agent: 'user_agent'
  };

  export type SessionOrderByRelevanceFieldEnum = (typeof SessionOrderByRelevanceFieldEnum)[keyof typeof SessionOrderByRelevanceFieldEnum]


  export const AuthLogOrderByRelevanceFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    ip_address: 'ip_address',
    user_agent: 'user_agent',
    details: 'details'
  };

  export type AuthLogOrderByRelevanceFieldEnum = (typeof AuthLogOrderByRelevanceFieldEnum)[keyof typeof AuthLogOrderByRelevanceFieldEnum]


  export const EmailVerificationOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token'
  };

  export type EmailVerificationOrderByRelevanceFieldEnum = (typeof EmailVerificationOrderByRelevanceFieldEnum)[keyof typeof EmailVerificationOrderByRelevanceFieldEnum]


  export const PasswordResetOrderByRelevanceFieldEnum: {
    id: 'id',
    app_user_id: 'app_user_id',
    token: 'token'
  };

  export type PasswordResetOrderByRelevanceFieldEnum = (typeof PasswordResetOrderByRelevanceFieldEnum)[keyof typeof PasswordResetOrderByRelevanceFieldEnum]


  export const AuthEventOrderByRelevanceFieldEnum: {
    id: 'id',
    app_user_id: 'app_user_id',
    event_type: 'event_type',
    ip_address: 'ip_address',
    user_agent: 'user_agent',
    details: 'details'
  };

  export type AuthEventOrderByRelevanceFieldEnum = (typeof AuthEventOrderByRelevanceFieldEnum)[keyof typeof AuthEventOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'AuthEventType'
   */
  export type EnumAuthEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthEventType'>
    


  /**
   * Reference to a field of type 'AuthEventStatus'
   */
  export type EnumAuthEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthEventStatus'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type AppUserWhereInput = {
    AND?: AppUserWhereInput | AppUserWhereInput[]
    OR?: AppUserWhereInput[]
    NOT?: AppUserWhereInput | AppUserWhereInput[]
    id?: StringFilter<"AppUser"> | string
    email?: StringFilter<"AppUser"> | string
    username?: StringFilter<"AppUser"> | string
    password_hash?: StringFilter<"AppUser"> | string
    name?: StringNullableFilter<"AppUser"> | string | null
    company_name?: StringNullableFilter<"AppUser"> | string | null
    phone?: StringNullableFilter<"AppUser"> | string | null
    website?: StringNullableFilter<"AppUser"> | string | null
    active?: BoolFilter<"AppUser"> | boolean
    created_at?: DateTimeFilter<"AppUser"> | Date | string
    updated_at?: DateTimeFilter<"AppUser"> | Date | string
    email_verified?: BoolFilter<"AppUser"> | boolean
    email_verified_at?: DateTimeNullableFilter<"AppUser"> | Date | string | null
    reset_token?: StringNullableFilter<"AppUser"> | string | null
    reset_token_expires?: DateTimeNullableFilter<"AppUser"> | Date | string | null
    api_keys?: ApiKeyListRelationFilter
    app_sessions?: AppSessionListRelationFilter
    password_resets?: XOR<PasswordResetNullableScalarRelationFilter, PasswordResetWhereInput> | null
    auth_events?: AuthEventListRelationFilter
  }

  export type AppUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    name?: SortOrderInput | SortOrder
    company_name?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    email_verified?: SortOrder
    email_verified_at?: SortOrderInput | SortOrder
    reset_token?: SortOrderInput | SortOrder
    reset_token_expires?: SortOrderInput | SortOrder
    api_keys?: ApiKeyOrderByRelationAggregateInput
    app_sessions?: AppSessionOrderByRelationAggregateInput
    password_resets?: PasswordResetOrderByWithRelationInput
    auth_events?: AuthEventOrderByRelationAggregateInput
    _relevance?: AppUserOrderByRelevanceInput
  }

  export type AppUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    AND?: AppUserWhereInput | AppUserWhereInput[]
    OR?: AppUserWhereInput[]
    NOT?: AppUserWhereInput | AppUserWhereInput[]
    password_hash?: StringFilter<"AppUser"> | string
    name?: StringNullableFilter<"AppUser"> | string | null
    company_name?: StringNullableFilter<"AppUser"> | string | null
    phone?: StringNullableFilter<"AppUser"> | string | null
    website?: StringNullableFilter<"AppUser"> | string | null
    active?: BoolFilter<"AppUser"> | boolean
    created_at?: DateTimeFilter<"AppUser"> | Date | string
    updated_at?: DateTimeFilter<"AppUser"> | Date | string
    email_verified?: BoolFilter<"AppUser"> | boolean
    email_verified_at?: DateTimeNullableFilter<"AppUser"> | Date | string | null
    reset_token?: StringNullableFilter<"AppUser"> | string | null
    reset_token_expires?: DateTimeNullableFilter<"AppUser"> | Date | string | null
    api_keys?: ApiKeyListRelationFilter
    app_sessions?: AppSessionListRelationFilter
    password_resets?: XOR<PasswordResetNullableScalarRelationFilter, PasswordResetWhereInput> | null
    auth_events?: AuthEventListRelationFilter
  }, "id" | "email" | "username">

  export type AppUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    name?: SortOrderInput | SortOrder
    company_name?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    email_verified?: SortOrder
    email_verified_at?: SortOrderInput | SortOrder
    reset_token?: SortOrderInput | SortOrder
    reset_token_expires?: SortOrderInput | SortOrder
    _count?: AppUserCountOrderByAggregateInput
    _max?: AppUserMaxOrderByAggregateInput
    _min?: AppUserMinOrderByAggregateInput
  }

  export type AppUserScalarWhereWithAggregatesInput = {
    AND?: AppUserScalarWhereWithAggregatesInput | AppUserScalarWhereWithAggregatesInput[]
    OR?: AppUserScalarWhereWithAggregatesInput[]
    NOT?: AppUserScalarWhereWithAggregatesInput | AppUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AppUser"> | string
    email?: StringWithAggregatesFilter<"AppUser"> | string
    username?: StringWithAggregatesFilter<"AppUser"> | string
    password_hash?: StringWithAggregatesFilter<"AppUser"> | string
    name?: StringNullableWithAggregatesFilter<"AppUser"> | string | null
    company_name?: StringNullableWithAggregatesFilter<"AppUser"> | string | null
    phone?: StringNullableWithAggregatesFilter<"AppUser"> | string | null
    website?: StringNullableWithAggregatesFilter<"AppUser"> | string | null
    active?: BoolWithAggregatesFilter<"AppUser"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"AppUser"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AppUser"> | Date | string
    email_verified?: BoolWithAggregatesFilter<"AppUser"> | boolean
    email_verified_at?: DateTimeNullableWithAggregatesFilter<"AppUser"> | Date | string | null
    reset_token?: StringNullableWithAggregatesFilter<"AppUser"> | string | null
    reset_token_expires?: DateTimeNullableWithAggregatesFilter<"AppUser"> | Date | string | null
  }

  export type ApiKeyWhereInput = {
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    app_user_id?: StringFilter<"ApiKey"> | string
    key?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    active?: BoolFilter<"ApiKey"> | boolean
    created_at?: DateTimeFilter<"ApiKey"> | Date | string
    updated_at?: DateTimeFilter<"ApiKey"> | Date | string
    last_used_at?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    app_user?: XOR<AppUserScalarRelationFilter, AppUserWhereInput>
    users?: UserListRelationFilter
  }

  export type ApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_used_at?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    app_user?: AppUserOrderByWithRelationInput
    users?: UserOrderByRelationAggregateInput
    _relevance?: ApiKeyOrderByRelevanceInput
  }

  export type ApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    app_user_id?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    active?: BoolFilter<"ApiKey"> | boolean
    created_at?: DateTimeFilter<"ApiKey"> | Date | string
    updated_at?: DateTimeFilter<"ApiKey"> | Date | string
    last_used_at?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    app_user?: XOR<AppUserScalarRelationFilter, AppUserWhereInput>
    users?: UserListRelationFilter
  }, "id" | "key">

  export type ApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_used_at?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    _count?: ApiKeyCountOrderByAggregateInput
    _max?: ApiKeyMaxOrderByAggregateInput
    _min?: ApiKeyMinOrderByAggregateInput
  }

  export type ApiKeyScalarWhereWithAggregatesInput = {
    AND?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    OR?: ApiKeyScalarWhereWithAggregatesInput[]
    NOT?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiKey"> | string
    app_user_id?: StringWithAggregatesFilter<"ApiKey"> | string
    key?: StringWithAggregatesFilter<"ApiKey"> | string
    name?: StringWithAggregatesFilter<"ApiKey"> | string
    active?: BoolWithAggregatesFilter<"ApiKey"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
    last_used_at?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    expires_at?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
  }

  export type AppSessionWhereInput = {
    AND?: AppSessionWhereInput | AppSessionWhereInput[]
    OR?: AppSessionWhereInput[]
    NOT?: AppSessionWhereInput | AppSessionWhereInput[]
    id?: StringFilter<"AppSession"> | string
    app_user_id?: StringFilter<"AppSession"> | string
    token?: StringFilter<"AppSession"> | string
    refresh_token?: StringNullableFilter<"AppSession"> | string | null
    ip_address?: StringNullableFilter<"AppSession"> | string | null
    user_agent?: StringNullableFilter<"AppSession"> | string | null
    expires_at?: DateTimeFilter<"AppSession"> | Date | string
    created_at?: DateTimeFilter<"AppSession"> | Date | string
    updated_at?: DateTimeFilter<"AppSession"> | Date | string
    revoked?: BoolFilter<"AppSession"> | boolean
    revoked_at?: DateTimeNullableFilter<"AppSession"> | Date | string | null
    app_user?: XOR<AppUserScalarRelationFilter, AppUserWhereInput>
  }

  export type AppSessionOrderByWithRelationInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    token?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    revoked?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    app_user?: AppUserOrderByWithRelationInput
    _relevance?: AppSessionOrderByRelevanceInput
  }

  export type AppSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    refresh_token?: string
    AND?: AppSessionWhereInput | AppSessionWhereInput[]
    OR?: AppSessionWhereInput[]
    NOT?: AppSessionWhereInput | AppSessionWhereInput[]
    app_user_id?: StringFilter<"AppSession"> | string
    ip_address?: StringNullableFilter<"AppSession"> | string | null
    user_agent?: StringNullableFilter<"AppSession"> | string | null
    expires_at?: DateTimeFilter<"AppSession"> | Date | string
    created_at?: DateTimeFilter<"AppSession"> | Date | string
    updated_at?: DateTimeFilter<"AppSession"> | Date | string
    revoked?: BoolFilter<"AppSession"> | boolean
    revoked_at?: DateTimeNullableFilter<"AppSession"> | Date | string | null
    app_user?: XOR<AppUserScalarRelationFilter, AppUserWhereInput>
  }, "id" | "token" | "refresh_token">

  export type AppSessionOrderByWithAggregationInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    token?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    revoked?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    _count?: AppSessionCountOrderByAggregateInput
    _max?: AppSessionMaxOrderByAggregateInput
    _min?: AppSessionMinOrderByAggregateInput
  }

  export type AppSessionScalarWhereWithAggregatesInput = {
    AND?: AppSessionScalarWhereWithAggregatesInput | AppSessionScalarWhereWithAggregatesInput[]
    OR?: AppSessionScalarWhereWithAggregatesInput[]
    NOT?: AppSessionScalarWhereWithAggregatesInput | AppSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AppSession"> | string
    app_user_id?: StringWithAggregatesFilter<"AppSession"> | string
    token?: StringWithAggregatesFilter<"AppSession"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"AppSession"> | string | null
    ip_address?: StringNullableWithAggregatesFilter<"AppSession"> | string | null
    user_agent?: StringNullableWithAggregatesFilter<"AppSession"> | string | null
    expires_at?: DateTimeWithAggregatesFilter<"AppSession"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"AppSession"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AppSession"> | Date | string
    revoked?: BoolWithAggregatesFilter<"AppSession"> | boolean
    revoked_at?: DateTimeNullableWithAggregatesFilter<"AppSession"> | Date | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    api_key_id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    active?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    email_verified?: BoolFilter<"User"> | boolean
    email_verified_at?: DateTimeNullableFilter<"User"> | Date | string | null
    reset_token?: StringNullableFilter<"User"> | string | null
    reset_token_expires?: DateTimeNullableFilter<"User"> | Date | string | null
    ip_address?: StringNullableFilter<"User"> | string | null
    user_agent?: StringNullableFilter<"User"> | string | null
    api_key?: XOR<ApiKeyScalarRelationFilter, ApiKeyWhereInput>
    accounts?: UserAccountListRelationFilter
    sessions?: SessionListRelationFilter
    auth_logs?: AuthLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    api_key_id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    name?: SortOrderInput | SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    email_verified?: SortOrder
    email_verified_at?: SortOrderInput | SortOrder
    reset_token?: SortOrderInput | SortOrder
    reset_token_expires?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    api_key?: ApiKeyOrderByWithRelationInput
    accounts?: UserAccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    auth_logs?: AuthLogOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email_api_key_id?: UserEmailApi_key_idCompoundUniqueInput
    username_api_key_id?: UserUsernameApi_key_idCompoundUniqueInput
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    api_key_id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    active?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    email_verified?: BoolFilter<"User"> | boolean
    email_verified_at?: DateTimeNullableFilter<"User"> | Date | string | null
    reset_token?: StringNullableFilter<"User"> | string | null
    reset_token_expires?: DateTimeNullableFilter<"User"> | Date | string | null
    ip_address?: StringNullableFilter<"User"> | string | null
    user_agent?: StringNullableFilter<"User"> | string | null
    api_key?: XOR<ApiKeyScalarRelationFilter, ApiKeyWhereInput>
    accounts?: UserAccountListRelationFilter
    sessions?: SessionListRelationFilter
    auth_logs?: AuthLogListRelationFilter
  }, "id" | "email_api_key_id" | "username_api_key_id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    api_key_id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    name?: SortOrderInput | SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    email_verified?: SortOrder
    email_verified_at?: SortOrderInput | SortOrder
    reset_token?: SortOrderInput | SortOrder
    reset_token_expires?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    api_key_id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    active?: BoolWithAggregatesFilter<"User"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    email_verified?: BoolWithAggregatesFilter<"User"> | boolean
    email_verified_at?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    reset_token?: StringNullableWithAggregatesFilter<"User"> | string | null
    reset_token_expires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    ip_address?: StringNullableWithAggregatesFilter<"User"> | string | null
    user_agent?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    name?: StringFilter<"Account"> | string
    api_key?: StringFilter<"Account"> | string
    active?: BoolFilter<"Account"> | boolean
    created_at?: DateTimeFilter<"Account"> | Date | string
    updated_at?: DateTimeFilter<"Account"> | Date | string
    user_accounts?: UserAccountListRelationFilter
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    api_key?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_accounts?: UserAccountOrderByRelationAggregateInput
    _relevance?: AccountOrderByRelevanceInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    api_key?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    name?: StringFilter<"Account"> | string
    active?: BoolFilter<"Account"> | boolean
    created_at?: DateTimeFilter<"Account"> | Date | string
    updated_at?: DateTimeFilter<"Account"> | Date | string
    user_accounts?: UserAccountListRelationFilter
  }, "id" | "api_key">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    api_key?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    name?: StringWithAggregatesFilter<"Account"> | string
    api_key?: StringWithAggregatesFilter<"Account"> | string
    active?: BoolWithAggregatesFilter<"Account"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type UserAccountWhereInput = {
    AND?: UserAccountWhereInput | UserAccountWhereInput[]
    OR?: UserAccountWhereInput[]
    NOT?: UserAccountWhereInput | UserAccountWhereInput[]
    id?: StringFilter<"UserAccount"> | string
    user_id?: StringFilter<"UserAccount"> | string
    account_id?: StringFilter<"UserAccount"> | string
    created_at?: DateTimeFilter<"UserAccount"> | Date | string
    created_by?: StringNullableFilter<"UserAccount"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
  }

  export type UserAccountOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    account_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    account?: AccountOrderByWithRelationInput
    _relevance?: UserAccountOrderByRelevanceInput
  }

  export type UserAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id_account_id?: UserAccountUser_idAccount_idCompoundUniqueInput
    AND?: UserAccountWhereInput | UserAccountWhereInput[]
    OR?: UserAccountWhereInput[]
    NOT?: UserAccountWhereInput | UserAccountWhereInput[]
    user_id?: StringFilter<"UserAccount"> | string
    account_id?: StringFilter<"UserAccount"> | string
    created_at?: DateTimeFilter<"UserAccount"> | Date | string
    created_by?: StringNullableFilter<"UserAccount"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
  }, "id" | "user_id_account_id">

  export type UserAccountOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    account_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrderInput | SortOrder
    _count?: UserAccountCountOrderByAggregateInput
    _max?: UserAccountMaxOrderByAggregateInput
    _min?: UserAccountMinOrderByAggregateInput
  }

  export type UserAccountScalarWhereWithAggregatesInput = {
    AND?: UserAccountScalarWhereWithAggregatesInput | UserAccountScalarWhereWithAggregatesInput[]
    OR?: UserAccountScalarWhereWithAggregatesInput[]
    NOT?: UserAccountScalarWhereWithAggregatesInput | UserAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserAccount"> | string
    user_id?: StringWithAggregatesFilter<"UserAccount"> | string
    account_id?: StringWithAggregatesFilter<"UserAccount"> | string
    created_at?: DateTimeWithAggregatesFilter<"UserAccount"> | Date | string
    created_by?: StringNullableWithAggregatesFilter<"UserAccount"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    user_id?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    refresh_token?: StringNullableFilter<"Session"> | string | null
    ip_address?: StringNullableFilter<"Session"> | string | null
    user_agent?: StringNullableFilter<"Session"> | string | null
    expires_at?: DateTimeFilter<"Session"> | Date | string
    created_at?: DateTimeFilter<"Session"> | Date | string
    updated_at?: DateTimeFilter<"Session"> | Date | string
    revoked?: BoolFilter<"Session"> | boolean
    revoked_at?: DateTimeNullableFilter<"Session"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    revoked?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: SessionOrderByRelevanceInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    refresh_token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    user_id?: StringFilter<"Session"> | string
    ip_address?: StringNullableFilter<"Session"> | string | null
    user_agent?: StringNullableFilter<"Session"> | string | null
    expires_at?: DateTimeFilter<"Session"> | Date | string
    created_at?: DateTimeFilter<"Session"> | Date | string
    updated_at?: DateTimeFilter<"Session"> | Date | string
    revoked?: BoolFilter<"Session"> | boolean
    revoked_at?: DateTimeNullableFilter<"Session"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token" | "refresh_token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    revoked?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    user_id?: StringWithAggregatesFilter<"Session"> | string
    token?: StringWithAggregatesFilter<"Session"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Session"> | string | null
    ip_address?: StringNullableWithAggregatesFilter<"Session"> | string | null
    user_agent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    expires_at?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    revoked?: BoolWithAggregatesFilter<"Session"> | boolean
    revoked_at?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
  }

  export type AuthLogWhereInput = {
    AND?: AuthLogWhereInput | AuthLogWhereInput[]
    OR?: AuthLogWhereInput[]
    NOT?: AuthLogWhereInput | AuthLogWhereInput[]
    id?: StringFilter<"AuthLog"> | string
    user_id?: StringNullableFilter<"AuthLog"> | string | null
    event_type?: EnumAuthEventTypeFilter<"AuthLog"> | $Enums.AuthEventType
    status?: EnumAuthEventStatusFilter<"AuthLog"> | $Enums.AuthEventStatus
    ip_address?: StringNullableFilter<"AuthLog"> | string | null
    user_agent?: StringNullableFilter<"AuthLog"> | string | null
    details?: StringNullableFilter<"AuthLog"> | string | null
    created_at?: DateTimeFilter<"AuthLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AuthLogOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    event_type?: SortOrder
    status?: SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: AuthLogOrderByRelevanceInput
  }

  export type AuthLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuthLogWhereInput | AuthLogWhereInput[]
    OR?: AuthLogWhereInput[]
    NOT?: AuthLogWhereInput | AuthLogWhereInput[]
    user_id?: StringNullableFilter<"AuthLog"> | string | null
    event_type?: EnumAuthEventTypeFilter<"AuthLog"> | $Enums.AuthEventType
    status?: EnumAuthEventStatusFilter<"AuthLog"> | $Enums.AuthEventStatus
    ip_address?: StringNullableFilter<"AuthLog"> | string | null
    user_agent?: StringNullableFilter<"AuthLog"> | string | null
    details?: StringNullableFilter<"AuthLog"> | string | null
    created_at?: DateTimeFilter<"AuthLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuthLogOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    event_type?: SortOrder
    status?: SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: AuthLogCountOrderByAggregateInput
    _max?: AuthLogMaxOrderByAggregateInput
    _min?: AuthLogMinOrderByAggregateInput
  }

  export type AuthLogScalarWhereWithAggregatesInput = {
    AND?: AuthLogScalarWhereWithAggregatesInput | AuthLogScalarWhereWithAggregatesInput[]
    OR?: AuthLogScalarWhereWithAggregatesInput[]
    NOT?: AuthLogScalarWhereWithAggregatesInput | AuthLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthLog"> | string
    user_id?: StringNullableWithAggregatesFilter<"AuthLog"> | string | null
    event_type?: EnumAuthEventTypeWithAggregatesFilter<"AuthLog"> | $Enums.AuthEventType
    status?: EnumAuthEventStatusWithAggregatesFilter<"AuthLog"> | $Enums.AuthEventStatus
    ip_address?: StringNullableWithAggregatesFilter<"AuthLog"> | string | null
    user_agent?: StringNullableWithAggregatesFilter<"AuthLog"> | string | null
    details?: StringNullableWithAggregatesFilter<"AuthLog"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AuthLog"> | Date | string
  }

  export type EmailVerificationWhereInput = {
    AND?: EmailVerificationWhereInput | EmailVerificationWhereInput[]
    OR?: EmailVerificationWhereInput[]
    NOT?: EmailVerificationWhereInput | EmailVerificationWhereInput[]
    id?: StringFilter<"EmailVerification"> | string
    email?: StringFilter<"EmailVerification"> | string
    token?: StringFilter<"EmailVerification"> | string
    expires_at?: DateTimeFilter<"EmailVerification"> | Date | string
    created_at?: DateTimeFilter<"EmailVerification"> | Date | string
  }

  export type EmailVerificationOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    _relevance?: EmailVerificationOrderByRelevanceInput
  }

  export type EmailVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: EmailVerificationWhereInput | EmailVerificationWhereInput[]
    OR?: EmailVerificationWhereInput[]
    NOT?: EmailVerificationWhereInput | EmailVerificationWhereInput[]
    email?: StringFilter<"EmailVerification"> | string
    expires_at?: DateTimeFilter<"EmailVerification"> | Date | string
    created_at?: DateTimeFilter<"EmailVerification"> | Date | string
  }, "id" | "token">

  export type EmailVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    _count?: EmailVerificationCountOrderByAggregateInput
    _max?: EmailVerificationMaxOrderByAggregateInput
    _min?: EmailVerificationMinOrderByAggregateInput
  }

  export type EmailVerificationScalarWhereWithAggregatesInput = {
    AND?: EmailVerificationScalarWhereWithAggregatesInput | EmailVerificationScalarWhereWithAggregatesInput[]
    OR?: EmailVerificationScalarWhereWithAggregatesInput[]
    NOT?: EmailVerificationScalarWhereWithAggregatesInput | EmailVerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailVerification"> | string
    email?: StringWithAggregatesFilter<"EmailVerification"> | string
    token?: StringWithAggregatesFilter<"EmailVerification"> | string
    expires_at?: DateTimeWithAggregatesFilter<"EmailVerification"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"EmailVerification"> | Date | string
  }

  export type PasswordResetWhereInput = {
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    id?: StringFilter<"PasswordReset"> | string
    app_user_id?: StringFilter<"PasswordReset"> | string
    token?: StringFilter<"PasswordReset"> | string
    expires_at?: DateTimeFilter<"PasswordReset"> | Date | string
    created_at?: DateTimeFilter<"PasswordReset"> | Date | string
    updated_at?: DateTimeFilter<"PasswordReset"> | Date | string
    used?: BoolFilter<"PasswordReset"> | boolean
    app_user?: XOR<AppUserScalarRelationFilter, AppUserWhereInput>
  }

  export type PasswordResetOrderByWithRelationInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    used?: SortOrder
    app_user?: AppUserOrderByWithRelationInput
    _relevance?: PasswordResetOrderByRelevanceInput
  }

  export type PasswordResetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    app_user_id?: string
    token?: string
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    expires_at?: DateTimeFilter<"PasswordReset"> | Date | string
    created_at?: DateTimeFilter<"PasswordReset"> | Date | string
    updated_at?: DateTimeFilter<"PasswordReset"> | Date | string
    used?: BoolFilter<"PasswordReset"> | boolean
    app_user?: XOR<AppUserScalarRelationFilter, AppUserWhereInput>
  }, "id" | "app_user_id" | "token">

  export type PasswordResetOrderByWithAggregationInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    used?: SortOrder
    _count?: PasswordResetCountOrderByAggregateInput
    _max?: PasswordResetMaxOrderByAggregateInput
    _min?: PasswordResetMinOrderByAggregateInput
  }

  export type PasswordResetScalarWhereWithAggregatesInput = {
    AND?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    OR?: PasswordResetScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordReset"> | string
    app_user_id?: StringWithAggregatesFilter<"PasswordReset"> | string
    token?: StringWithAggregatesFilter<"PasswordReset"> | string
    expires_at?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
    used?: BoolWithAggregatesFilter<"PasswordReset"> | boolean
  }

  export type AuthEventWhereInput = {
    AND?: AuthEventWhereInput | AuthEventWhereInput[]
    OR?: AuthEventWhereInput[]
    NOT?: AuthEventWhereInput | AuthEventWhereInput[]
    id?: StringFilter<"AuthEvent"> | string
    app_user_id?: StringFilter<"AuthEvent"> | string
    event_type?: StringFilter<"AuthEvent"> | string
    ip_address?: StringNullableFilter<"AuthEvent"> | string | null
    user_agent?: StringNullableFilter<"AuthEvent"> | string | null
    details?: StringNullableFilter<"AuthEvent"> | string | null
    created_at?: DateTimeFilter<"AuthEvent"> | Date | string
    app_user?: XOR<AppUserScalarRelationFilter, AppUserWhereInput>
  }

  export type AuthEventOrderByWithRelationInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    event_type?: SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    created_at?: SortOrder
    app_user?: AppUserOrderByWithRelationInput
    _relevance?: AuthEventOrderByRelevanceInput
  }

  export type AuthEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuthEventWhereInput | AuthEventWhereInput[]
    OR?: AuthEventWhereInput[]
    NOT?: AuthEventWhereInput | AuthEventWhereInput[]
    app_user_id?: StringFilter<"AuthEvent"> | string
    event_type?: StringFilter<"AuthEvent"> | string
    ip_address?: StringNullableFilter<"AuthEvent"> | string | null
    user_agent?: StringNullableFilter<"AuthEvent"> | string | null
    details?: StringNullableFilter<"AuthEvent"> | string | null
    created_at?: DateTimeFilter<"AuthEvent"> | Date | string
    app_user?: XOR<AppUserScalarRelationFilter, AppUserWhereInput>
  }, "id">

  export type AuthEventOrderByWithAggregationInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    event_type?: SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: AuthEventCountOrderByAggregateInput
    _max?: AuthEventMaxOrderByAggregateInput
    _min?: AuthEventMinOrderByAggregateInput
  }

  export type AuthEventScalarWhereWithAggregatesInput = {
    AND?: AuthEventScalarWhereWithAggregatesInput | AuthEventScalarWhereWithAggregatesInput[]
    OR?: AuthEventScalarWhereWithAggregatesInput[]
    NOT?: AuthEventScalarWhereWithAggregatesInput | AuthEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthEvent"> | string
    app_user_id?: StringWithAggregatesFilter<"AuthEvent"> | string
    event_type?: StringWithAggregatesFilter<"AuthEvent"> | string
    ip_address?: StringNullableWithAggregatesFilter<"AuthEvent"> | string | null
    user_agent?: StringNullableWithAggregatesFilter<"AuthEvent"> | string | null
    details?: StringNullableWithAggregatesFilter<"AuthEvent"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AuthEvent"> | Date | string
  }

  export type AppUserCreateInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    company_name?: string | null
    phone?: string | null
    website?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    api_keys?: ApiKeyCreateNestedManyWithoutApp_userInput
    app_sessions?: AppSessionCreateNestedManyWithoutApp_userInput
    password_resets?: PasswordResetCreateNestedOneWithoutApp_userInput
    auth_events?: AuthEventCreateNestedManyWithoutApp_userInput
  }

  export type AppUserUncheckedCreateInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    company_name?: string | null
    phone?: string | null
    website?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    api_keys?: ApiKeyUncheckedCreateNestedManyWithoutApp_userInput
    app_sessions?: AppSessionUncheckedCreateNestedManyWithoutApp_userInput
    password_resets?: PasswordResetUncheckedCreateNestedOneWithoutApp_userInput
    auth_events?: AuthEventUncheckedCreateNestedManyWithoutApp_userInput
  }

  export type AppUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    api_keys?: ApiKeyUpdateManyWithoutApp_userNestedInput
    app_sessions?: AppSessionUpdateManyWithoutApp_userNestedInput
    password_resets?: PasswordResetUpdateOneWithoutApp_userNestedInput
    auth_events?: AuthEventUpdateManyWithoutApp_userNestedInput
  }

  export type AppUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    api_keys?: ApiKeyUncheckedUpdateManyWithoutApp_userNestedInput
    app_sessions?: AppSessionUncheckedUpdateManyWithoutApp_userNestedInput
    password_resets?: PasswordResetUncheckedUpdateOneWithoutApp_userNestedInput
    auth_events?: AuthEventUncheckedUpdateManyWithoutApp_userNestedInput
  }

  export type AppUserCreateManyInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    company_name?: string | null
    phone?: string | null
    website?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
  }

  export type AppUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApiKeyCreateInput = {
    id?: string
    key: string
    name: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_used_at?: Date | string | null
    expires_at?: Date | string | null
    app_user: AppUserCreateNestedOneWithoutApi_keysInput
    users?: UserCreateNestedManyWithoutApi_keyInput
  }

  export type ApiKeyUncheckedCreateInput = {
    id?: string
    app_user_id: string
    key: string
    name: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_used_at?: Date | string | null
    expires_at?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutApi_keyInput
  }

  export type ApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    app_user?: AppUserUpdateOneRequiredWithoutApi_keysNestedInput
    users?: UserUpdateManyWithoutApi_keyNestedInput
  }

  export type ApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_user_id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutApi_keyNestedInput
  }

  export type ApiKeyCreateManyInput = {
    id?: string
    app_user_id: string
    key: string
    name: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_used_at?: Date | string | null
    expires_at?: Date | string | null
  }

  export type ApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_user_id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppSessionCreateInput = {
    id?: string
    token: string
    refresh_token?: string | null
    ip_address?: string | null
    user_agent?: string | null
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    revoked?: boolean
    revoked_at?: Date | string | null
    app_user: AppUserCreateNestedOneWithoutApp_sessionsInput
  }

  export type AppSessionUncheckedCreateInput = {
    id?: string
    app_user_id: string
    token: string
    refresh_token?: string | null
    ip_address?: string | null
    user_agent?: string | null
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    revoked?: boolean
    revoked_at?: Date | string | null
  }

  export type AppSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    app_user?: AppUserUpdateOneRequiredWithoutApp_sessionsNestedInput
  }

  export type AppSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppSessionCreateManyInput = {
    id?: string
    app_user_id: string
    token: string
    refresh_token?: string | null
    ip_address?: string | null
    user_agent?: string | null
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    revoked?: boolean
    revoked_at?: Date | string | null
  }

  export type AppSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    ip_address?: string | null
    user_agent?: string | null
    api_key: ApiKeyCreateNestedOneWithoutUsersInput
    accounts?: UserAccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    auth_logs?: AuthLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    api_key_id: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    ip_address?: string | null
    user_agent?: string | null
    accounts?: UserAccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    auth_logs?: AuthLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    api_key?: ApiKeyUpdateOneRequiredWithoutUsersNestedInput
    accounts?: UserAccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    auth_logs?: AuthLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    api_key_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: UserAccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    auth_logs?: AuthLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    api_key_id: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    ip_address?: string | null
    user_agent?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    api_key_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateInput = {
    id?: string
    name: string
    api_key: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    user_accounts?: UserAccountCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    name: string
    api_key: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    user_accounts?: UserAccountUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_accounts?: UserAccountUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_accounts?: UserAccountUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountCreateManyInput = {
    id?: string
    name: string
    api_key: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAccountCreateInput = {
    id?: string
    created_at?: Date | string
    created_by?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
    account: AccountCreateNestedOneWithoutUser_accountsInput
  }

  export type UserAccountUncheckedCreateInput = {
    id?: string
    user_id: string
    account_id: string
    created_at?: Date | string
    created_by?: string | null
  }

  export type UserAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
    account?: AccountUpdateOneRequiredWithoutUser_accountsNestedInput
  }

  export type UserAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserAccountCreateManyInput = {
    id?: string
    user_id: string
    account_id: string
    created_at?: Date | string
    created_by?: string | null
  }

  export type UserAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    token: string
    refresh_token?: string | null
    ip_address?: string | null
    user_agent?: string | null
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    revoked?: boolean
    revoked_at?: Date | string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    user_id: string
    token: string
    refresh_token?: string | null
    ip_address?: string | null
    user_agent?: string | null
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    revoked?: boolean
    revoked_at?: Date | string | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateManyInput = {
    id?: string
    user_id: string
    token: string
    refresh_token?: string | null
    ip_address?: string | null
    user_agent?: string | null
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    revoked?: boolean
    revoked_at?: Date | string | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuthLogCreateInput = {
    id?: string
    event_type: $Enums.AuthEventType
    status: $Enums.AuthEventStatus
    ip_address?: string | null
    user_agent?: string | null
    details?: string | null
    created_at?: Date | string
    user?: UserCreateNestedOneWithoutAuth_logsInput
  }

  export type AuthLogUncheckedCreateInput = {
    id?: string
    user_id?: string | null
    event_type: $Enums.AuthEventType
    status: $Enums.AuthEventStatus
    ip_address?: string | null
    user_agent?: string | null
    details?: string | null
    created_at?: Date | string
  }

  export type AuthLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: EnumAuthEventTypeFieldUpdateOperationsInput | $Enums.AuthEventType
    status?: EnumAuthEventStatusFieldUpdateOperationsInput | $Enums.AuthEventStatus
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuth_logsNestedInput
  }

  export type AuthLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_type?: EnumAuthEventTypeFieldUpdateOperationsInput | $Enums.AuthEventType
    status?: EnumAuthEventStatusFieldUpdateOperationsInput | $Enums.AuthEventStatus
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthLogCreateManyInput = {
    id?: string
    user_id?: string | null
    event_type: $Enums.AuthEventType
    status: $Enums.AuthEventStatus
    ip_address?: string | null
    user_agent?: string | null
    details?: string | null
    created_at?: Date | string
  }

  export type AuthLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: EnumAuthEventTypeFieldUpdateOperationsInput | $Enums.AuthEventType
    status?: EnumAuthEventStatusFieldUpdateOperationsInput | $Enums.AuthEventStatus
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_type?: EnumAuthEventTypeFieldUpdateOperationsInput | $Enums.AuthEventType
    status?: EnumAuthEventStatusFieldUpdateOperationsInput | $Enums.AuthEventStatus
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationCreateInput = {
    id?: string
    email: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
  }

  export type EmailVerificationUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
  }

  export type EmailVerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationCreateManyInput = {
    id?: string
    email: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
  }

  export type EmailVerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailVerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetCreateInput = {
    id?: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    used?: boolean
    app_user: AppUserCreateNestedOneWithoutPassword_resetsInput
  }

  export type PasswordResetUncheckedCreateInput = {
    id?: string
    app_user_id: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    used?: boolean
  }

  export type PasswordResetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    app_user?: AppUserUpdateOneRequiredWithoutPassword_resetsNestedInput
  }

  export type PasswordResetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PasswordResetCreateManyInput = {
    id?: string
    app_user_id: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    used?: boolean
  }

  export type PasswordResetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PasswordResetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AuthEventCreateInput = {
    id?: string
    event_type: string
    ip_address?: string | null
    user_agent?: string | null
    details?: string | null
    created_at?: Date | string
    app_user: AppUserCreateNestedOneWithoutAuth_eventsInput
  }

  export type AuthEventUncheckedCreateInput = {
    id?: string
    app_user_id: string
    event_type: string
    ip_address?: string | null
    user_agent?: string | null
    details?: string | null
    created_at?: Date | string
  }

  export type AuthEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    app_user?: AppUserUpdateOneRequiredWithoutAuth_eventsNestedInput
  }

  export type AuthEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_user_id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthEventCreateManyInput = {
    id?: string
    app_user_id: string
    event_type: string
    ip_address?: string | null
    user_agent?: string | null
    details?: string | null
    created_at?: Date | string
  }

  export type AuthEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_user_id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ApiKeyListRelationFilter = {
    every?: ApiKeyWhereInput
    some?: ApiKeyWhereInput
    none?: ApiKeyWhereInput
  }

  export type AppSessionListRelationFilter = {
    every?: AppSessionWhereInput
    some?: AppSessionWhereInput
    none?: AppSessionWhereInput
  }

  export type PasswordResetNullableScalarRelationFilter = {
    is?: PasswordResetWhereInput | null
    isNot?: PasswordResetWhereInput | null
  }

  export type AuthEventListRelationFilter = {
    every?: AuthEventWhereInput
    some?: AuthEventWhereInput
    none?: AuthEventWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ApiKeyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuthEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppUserOrderByRelevanceInput = {
    fields: AppUserOrderByRelevanceFieldEnum | AppUserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AppUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    name?: SortOrder
    company_name?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    email_verified?: SortOrder
    email_verified_at?: SortOrder
    reset_token?: SortOrder
    reset_token_expires?: SortOrder
  }

  export type AppUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    name?: SortOrder
    company_name?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    email_verified?: SortOrder
    email_verified_at?: SortOrder
    reset_token?: SortOrder
    reset_token_expires?: SortOrder
  }

  export type AppUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    name?: SortOrder
    company_name?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    email_verified?: SortOrder
    email_verified_at?: SortOrder
    reset_token?: SortOrder
    reset_token_expires?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AppUserScalarRelationFilter = {
    is?: AppUserWhereInput
    isNot?: AppUserWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApiKeyOrderByRelevanceInput = {
    fields: ApiKeyOrderByRelevanceFieldEnum | ApiKeyOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_used_at?: SortOrder
    expires_at?: SortOrder
  }

  export type ApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_used_at?: SortOrder
    expires_at?: SortOrder
  }

  export type ApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_used_at?: SortOrder
    expires_at?: SortOrder
  }

  export type AppSessionOrderByRelevanceInput = {
    fields: AppSessionOrderByRelevanceFieldEnum | AppSessionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AppSessionCountOrderByAggregateInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    token?: SortOrder
    refresh_token?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    revoked?: SortOrder
    revoked_at?: SortOrder
  }

  export type AppSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    token?: SortOrder
    refresh_token?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    revoked?: SortOrder
    revoked_at?: SortOrder
  }

  export type AppSessionMinOrderByAggregateInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    token?: SortOrder
    refresh_token?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    revoked?: SortOrder
    revoked_at?: SortOrder
  }

  export type ApiKeyScalarRelationFilter = {
    is?: ApiKeyWhereInput
    isNot?: ApiKeyWhereInput
  }

  export type UserAccountListRelationFilter = {
    every?: UserAccountWhereInput
    some?: UserAccountWhereInput
    none?: UserAccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AuthLogListRelationFilter = {
    every?: AuthLogWhereInput
    some?: AuthLogWhereInput
    none?: AuthLogWhereInput
  }

  export type UserAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuthLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserEmailApi_key_idCompoundUniqueInput = {
    email: string
    api_key_id: string
  }

  export type UserUsernameApi_key_idCompoundUniqueInput = {
    username: string
    api_key_id: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    api_key_id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    name?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    email_verified?: SortOrder
    email_verified_at?: SortOrder
    reset_token?: SortOrder
    reset_token_expires?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    api_key_id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    name?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    email_verified?: SortOrder
    email_verified_at?: SortOrder
    reset_token?: SortOrder
    reset_token_expires?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    api_key_id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    name?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    email_verified?: SortOrder
    email_verified_at?: SortOrder
    reset_token?: SortOrder
    reset_token_expires?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
  }

  export type AccountOrderByRelevanceInput = {
    fields: AccountOrderByRelevanceFieldEnum | AccountOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    api_key?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    api_key?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    api_key?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountScalarRelationFilter = {
    is?: AccountWhereInput
    isNot?: AccountWhereInput
  }

  export type UserAccountOrderByRelevanceInput = {
    fields: UserAccountOrderByRelevanceFieldEnum | UserAccountOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserAccountUser_idAccount_idCompoundUniqueInput = {
    user_id: string
    account_id: string
  }

  export type UserAccountCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    account_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
  }

  export type UserAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    account_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
  }

  export type UserAccountMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    account_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
  }

  export type SessionOrderByRelevanceInput = {
    fields: SessionOrderByRelevanceFieldEnum | SessionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    refresh_token?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    revoked?: SortOrder
    revoked_at?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    refresh_token?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    revoked?: SortOrder
    revoked_at?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    refresh_token?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    revoked?: SortOrder
    revoked_at?: SortOrder
  }

  export type EnumAuthEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthEventType | EnumAuthEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuthEventType[]
    notIn?: $Enums.AuthEventType[]
    not?: NestedEnumAuthEventTypeFilter<$PrismaModel> | $Enums.AuthEventType
  }

  export type EnumAuthEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthEventStatus | EnumAuthEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AuthEventStatus[]
    notIn?: $Enums.AuthEventStatus[]
    not?: NestedEnumAuthEventStatusFilter<$PrismaModel> | $Enums.AuthEventStatus
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AuthLogOrderByRelevanceInput = {
    fields: AuthLogOrderByRelevanceFieldEnum | AuthLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AuthLogCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_type?: SortOrder
    status?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type AuthLogMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_type?: SortOrder
    status?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type AuthLogMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_type?: SortOrder
    status?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type EnumAuthEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthEventType | EnumAuthEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuthEventType[]
    notIn?: $Enums.AuthEventType[]
    not?: NestedEnumAuthEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.AuthEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthEventTypeFilter<$PrismaModel>
    _max?: NestedEnumAuthEventTypeFilter<$PrismaModel>
  }

  export type EnumAuthEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthEventStatus | EnumAuthEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AuthEventStatus[]
    notIn?: $Enums.AuthEventStatus[]
    not?: NestedEnumAuthEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.AuthEventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthEventStatusFilter<$PrismaModel>
    _max?: NestedEnumAuthEventStatusFilter<$PrismaModel>
  }

  export type EmailVerificationOrderByRelevanceInput = {
    fields: EmailVerificationOrderByRelevanceFieldEnum | EmailVerificationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EmailVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type EmailVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type EmailVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type PasswordResetOrderByRelevanceInput = {
    fields: PasswordResetOrderByRelevanceFieldEnum | PasswordResetOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PasswordResetCountOrderByAggregateInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    used?: SortOrder
  }

  export type PasswordResetMaxOrderByAggregateInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    used?: SortOrder
  }

  export type PasswordResetMinOrderByAggregateInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    used?: SortOrder
  }

  export type AuthEventOrderByRelevanceInput = {
    fields: AuthEventOrderByRelevanceFieldEnum | AuthEventOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AuthEventCountOrderByAggregateInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    event_type?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type AuthEventMaxOrderByAggregateInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    event_type?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type AuthEventMinOrderByAggregateInput = {
    id?: SortOrder
    app_user_id?: SortOrder
    event_type?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type ApiKeyCreateNestedManyWithoutApp_userInput = {
    create?: XOR<ApiKeyCreateWithoutApp_userInput, ApiKeyUncheckedCreateWithoutApp_userInput> | ApiKeyCreateWithoutApp_userInput[] | ApiKeyUncheckedCreateWithoutApp_userInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutApp_userInput | ApiKeyCreateOrConnectWithoutApp_userInput[]
    createMany?: ApiKeyCreateManyApp_userInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
  }

  export type AppSessionCreateNestedManyWithoutApp_userInput = {
    create?: XOR<AppSessionCreateWithoutApp_userInput, AppSessionUncheckedCreateWithoutApp_userInput> | AppSessionCreateWithoutApp_userInput[] | AppSessionUncheckedCreateWithoutApp_userInput[]
    connectOrCreate?: AppSessionCreateOrConnectWithoutApp_userInput | AppSessionCreateOrConnectWithoutApp_userInput[]
    createMany?: AppSessionCreateManyApp_userInputEnvelope
    connect?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
  }

  export type PasswordResetCreateNestedOneWithoutApp_userInput = {
    create?: XOR<PasswordResetCreateWithoutApp_userInput, PasswordResetUncheckedCreateWithoutApp_userInput>
    connectOrCreate?: PasswordResetCreateOrConnectWithoutApp_userInput
    connect?: PasswordResetWhereUniqueInput
  }

  export type AuthEventCreateNestedManyWithoutApp_userInput = {
    create?: XOR<AuthEventCreateWithoutApp_userInput, AuthEventUncheckedCreateWithoutApp_userInput> | AuthEventCreateWithoutApp_userInput[] | AuthEventUncheckedCreateWithoutApp_userInput[]
    connectOrCreate?: AuthEventCreateOrConnectWithoutApp_userInput | AuthEventCreateOrConnectWithoutApp_userInput[]
    createMany?: AuthEventCreateManyApp_userInputEnvelope
    connect?: AuthEventWhereUniqueInput | AuthEventWhereUniqueInput[]
  }

  export type ApiKeyUncheckedCreateNestedManyWithoutApp_userInput = {
    create?: XOR<ApiKeyCreateWithoutApp_userInput, ApiKeyUncheckedCreateWithoutApp_userInput> | ApiKeyCreateWithoutApp_userInput[] | ApiKeyUncheckedCreateWithoutApp_userInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutApp_userInput | ApiKeyCreateOrConnectWithoutApp_userInput[]
    createMany?: ApiKeyCreateManyApp_userInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
  }

  export type AppSessionUncheckedCreateNestedManyWithoutApp_userInput = {
    create?: XOR<AppSessionCreateWithoutApp_userInput, AppSessionUncheckedCreateWithoutApp_userInput> | AppSessionCreateWithoutApp_userInput[] | AppSessionUncheckedCreateWithoutApp_userInput[]
    connectOrCreate?: AppSessionCreateOrConnectWithoutApp_userInput | AppSessionCreateOrConnectWithoutApp_userInput[]
    createMany?: AppSessionCreateManyApp_userInputEnvelope
    connect?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
  }

  export type PasswordResetUncheckedCreateNestedOneWithoutApp_userInput = {
    create?: XOR<PasswordResetCreateWithoutApp_userInput, PasswordResetUncheckedCreateWithoutApp_userInput>
    connectOrCreate?: PasswordResetCreateOrConnectWithoutApp_userInput
    connect?: PasswordResetWhereUniqueInput
  }

  export type AuthEventUncheckedCreateNestedManyWithoutApp_userInput = {
    create?: XOR<AuthEventCreateWithoutApp_userInput, AuthEventUncheckedCreateWithoutApp_userInput> | AuthEventCreateWithoutApp_userInput[] | AuthEventUncheckedCreateWithoutApp_userInput[]
    connectOrCreate?: AuthEventCreateOrConnectWithoutApp_userInput | AuthEventCreateOrConnectWithoutApp_userInput[]
    createMany?: AuthEventCreateManyApp_userInputEnvelope
    connect?: AuthEventWhereUniqueInput | AuthEventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ApiKeyUpdateManyWithoutApp_userNestedInput = {
    create?: XOR<ApiKeyCreateWithoutApp_userInput, ApiKeyUncheckedCreateWithoutApp_userInput> | ApiKeyCreateWithoutApp_userInput[] | ApiKeyUncheckedCreateWithoutApp_userInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutApp_userInput | ApiKeyCreateOrConnectWithoutApp_userInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutApp_userInput | ApiKeyUpsertWithWhereUniqueWithoutApp_userInput[]
    createMany?: ApiKeyCreateManyApp_userInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutApp_userInput | ApiKeyUpdateWithWhereUniqueWithoutApp_userInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutApp_userInput | ApiKeyUpdateManyWithWhereWithoutApp_userInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
  }

  export type AppSessionUpdateManyWithoutApp_userNestedInput = {
    create?: XOR<AppSessionCreateWithoutApp_userInput, AppSessionUncheckedCreateWithoutApp_userInput> | AppSessionCreateWithoutApp_userInput[] | AppSessionUncheckedCreateWithoutApp_userInput[]
    connectOrCreate?: AppSessionCreateOrConnectWithoutApp_userInput | AppSessionCreateOrConnectWithoutApp_userInput[]
    upsert?: AppSessionUpsertWithWhereUniqueWithoutApp_userInput | AppSessionUpsertWithWhereUniqueWithoutApp_userInput[]
    createMany?: AppSessionCreateManyApp_userInputEnvelope
    set?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    disconnect?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    delete?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    connect?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    update?: AppSessionUpdateWithWhereUniqueWithoutApp_userInput | AppSessionUpdateWithWhereUniqueWithoutApp_userInput[]
    updateMany?: AppSessionUpdateManyWithWhereWithoutApp_userInput | AppSessionUpdateManyWithWhereWithoutApp_userInput[]
    deleteMany?: AppSessionScalarWhereInput | AppSessionScalarWhereInput[]
  }

  export type PasswordResetUpdateOneWithoutApp_userNestedInput = {
    create?: XOR<PasswordResetCreateWithoutApp_userInput, PasswordResetUncheckedCreateWithoutApp_userInput>
    connectOrCreate?: PasswordResetCreateOrConnectWithoutApp_userInput
    upsert?: PasswordResetUpsertWithoutApp_userInput
    disconnect?: PasswordResetWhereInput | boolean
    delete?: PasswordResetWhereInput | boolean
    connect?: PasswordResetWhereUniqueInput
    update?: XOR<XOR<PasswordResetUpdateToOneWithWhereWithoutApp_userInput, PasswordResetUpdateWithoutApp_userInput>, PasswordResetUncheckedUpdateWithoutApp_userInput>
  }

  export type AuthEventUpdateManyWithoutApp_userNestedInput = {
    create?: XOR<AuthEventCreateWithoutApp_userInput, AuthEventUncheckedCreateWithoutApp_userInput> | AuthEventCreateWithoutApp_userInput[] | AuthEventUncheckedCreateWithoutApp_userInput[]
    connectOrCreate?: AuthEventCreateOrConnectWithoutApp_userInput | AuthEventCreateOrConnectWithoutApp_userInput[]
    upsert?: AuthEventUpsertWithWhereUniqueWithoutApp_userInput | AuthEventUpsertWithWhereUniqueWithoutApp_userInput[]
    createMany?: AuthEventCreateManyApp_userInputEnvelope
    set?: AuthEventWhereUniqueInput | AuthEventWhereUniqueInput[]
    disconnect?: AuthEventWhereUniqueInput | AuthEventWhereUniqueInput[]
    delete?: AuthEventWhereUniqueInput | AuthEventWhereUniqueInput[]
    connect?: AuthEventWhereUniqueInput | AuthEventWhereUniqueInput[]
    update?: AuthEventUpdateWithWhereUniqueWithoutApp_userInput | AuthEventUpdateWithWhereUniqueWithoutApp_userInput[]
    updateMany?: AuthEventUpdateManyWithWhereWithoutApp_userInput | AuthEventUpdateManyWithWhereWithoutApp_userInput[]
    deleteMany?: AuthEventScalarWhereInput | AuthEventScalarWhereInput[]
  }

  export type ApiKeyUncheckedUpdateManyWithoutApp_userNestedInput = {
    create?: XOR<ApiKeyCreateWithoutApp_userInput, ApiKeyUncheckedCreateWithoutApp_userInput> | ApiKeyCreateWithoutApp_userInput[] | ApiKeyUncheckedCreateWithoutApp_userInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutApp_userInput | ApiKeyCreateOrConnectWithoutApp_userInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutApp_userInput | ApiKeyUpsertWithWhereUniqueWithoutApp_userInput[]
    createMany?: ApiKeyCreateManyApp_userInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutApp_userInput | ApiKeyUpdateWithWhereUniqueWithoutApp_userInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutApp_userInput | ApiKeyUpdateManyWithWhereWithoutApp_userInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
  }

  export type AppSessionUncheckedUpdateManyWithoutApp_userNestedInput = {
    create?: XOR<AppSessionCreateWithoutApp_userInput, AppSessionUncheckedCreateWithoutApp_userInput> | AppSessionCreateWithoutApp_userInput[] | AppSessionUncheckedCreateWithoutApp_userInput[]
    connectOrCreate?: AppSessionCreateOrConnectWithoutApp_userInput | AppSessionCreateOrConnectWithoutApp_userInput[]
    upsert?: AppSessionUpsertWithWhereUniqueWithoutApp_userInput | AppSessionUpsertWithWhereUniqueWithoutApp_userInput[]
    createMany?: AppSessionCreateManyApp_userInputEnvelope
    set?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    disconnect?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    delete?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    connect?: AppSessionWhereUniqueInput | AppSessionWhereUniqueInput[]
    update?: AppSessionUpdateWithWhereUniqueWithoutApp_userInput | AppSessionUpdateWithWhereUniqueWithoutApp_userInput[]
    updateMany?: AppSessionUpdateManyWithWhereWithoutApp_userInput | AppSessionUpdateManyWithWhereWithoutApp_userInput[]
    deleteMany?: AppSessionScalarWhereInput | AppSessionScalarWhereInput[]
  }

  export type PasswordResetUncheckedUpdateOneWithoutApp_userNestedInput = {
    create?: XOR<PasswordResetCreateWithoutApp_userInput, PasswordResetUncheckedCreateWithoutApp_userInput>
    connectOrCreate?: PasswordResetCreateOrConnectWithoutApp_userInput
    upsert?: PasswordResetUpsertWithoutApp_userInput
    disconnect?: PasswordResetWhereInput | boolean
    delete?: PasswordResetWhereInput | boolean
    connect?: PasswordResetWhereUniqueInput
    update?: XOR<XOR<PasswordResetUpdateToOneWithWhereWithoutApp_userInput, PasswordResetUpdateWithoutApp_userInput>, PasswordResetUncheckedUpdateWithoutApp_userInput>
  }

  export type AuthEventUncheckedUpdateManyWithoutApp_userNestedInput = {
    create?: XOR<AuthEventCreateWithoutApp_userInput, AuthEventUncheckedCreateWithoutApp_userInput> | AuthEventCreateWithoutApp_userInput[] | AuthEventUncheckedCreateWithoutApp_userInput[]
    connectOrCreate?: AuthEventCreateOrConnectWithoutApp_userInput | AuthEventCreateOrConnectWithoutApp_userInput[]
    upsert?: AuthEventUpsertWithWhereUniqueWithoutApp_userInput | AuthEventUpsertWithWhereUniqueWithoutApp_userInput[]
    createMany?: AuthEventCreateManyApp_userInputEnvelope
    set?: AuthEventWhereUniqueInput | AuthEventWhereUniqueInput[]
    disconnect?: AuthEventWhereUniqueInput | AuthEventWhereUniqueInput[]
    delete?: AuthEventWhereUniqueInput | AuthEventWhereUniqueInput[]
    connect?: AuthEventWhereUniqueInput | AuthEventWhereUniqueInput[]
    update?: AuthEventUpdateWithWhereUniqueWithoutApp_userInput | AuthEventUpdateWithWhereUniqueWithoutApp_userInput[]
    updateMany?: AuthEventUpdateManyWithWhereWithoutApp_userInput | AuthEventUpdateManyWithWhereWithoutApp_userInput[]
    deleteMany?: AuthEventScalarWhereInput | AuthEventScalarWhereInput[]
  }

  export type AppUserCreateNestedOneWithoutApi_keysInput = {
    create?: XOR<AppUserCreateWithoutApi_keysInput, AppUserUncheckedCreateWithoutApi_keysInput>
    connectOrCreate?: AppUserCreateOrConnectWithoutApi_keysInput
    connect?: AppUserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutApi_keyInput = {
    create?: XOR<UserCreateWithoutApi_keyInput, UserUncheckedCreateWithoutApi_keyInput> | UserCreateWithoutApi_keyInput[] | UserUncheckedCreateWithoutApi_keyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutApi_keyInput | UserCreateOrConnectWithoutApi_keyInput[]
    createMany?: UserCreateManyApi_keyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutApi_keyInput = {
    create?: XOR<UserCreateWithoutApi_keyInput, UserUncheckedCreateWithoutApi_keyInput> | UserCreateWithoutApi_keyInput[] | UserUncheckedCreateWithoutApi_keyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutApi_keyInput | UserCreateOrConnectWithoutApi_keyInput[]
    createMany?: UserCreateManyApi_keyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AppUserUpdateOneRequiredWithoutApi_keysNestedInput = {
    create?: XOR<AppUserCreateWithoutApi_keysInput, AppUserUncheckedCreateWithoutApi_keysInput>
    connectOrCreate?: AppUserCreateOrConnectWithoutApi_keysInput
    upsert?: AppUserUpsertWithoutApi_keysInput
    connect?: AppUserWhereUniqueInput
    update?: XOR<XOR<AppUserUpdateToOneWithWhereWithoutApi_keysInput, AppUserUpdateWithoutApi_keysInput>, AppUserUncheckedUpdateWithoutApi_keysInput>
  }

  export type UserUpdateManyWithoutApi_keyNestedInput = {
    create?: XOR<UserCreateWithoutApi_keyInput, UserUncheckedCreateWithoutApi_keyInput> | UserCreateWithoutApi_keyInput[] | UserUncheckedCreateWithoutApi_keyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutApi_keyInput | UserCreateOrConnectWithoutApi_keyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutApi_keyInput | UserUpsertWithWhereUniqueWithoutApi_keyInput[]
    createMany?: UserCreateManyApi_keyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutApi_keyInput | UserUpdateWithWhereUniqueWithoutApi_keyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutApi_keyInput | UserUpdateManyWithWhereWithoutApi_keyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutApi_keyNestedInput = {
    create?: XOR<UserCreateWithoutApi_keyInput, UserUncheckedCreateWithoutApi_keyInput> | UserCreateWithoutApi_keyInput[] | UserUncheckedCreateWithoutApi_keyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutApi_keyInput | UserCreateOrConnectWithoutApi_keyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutApi_keyInput | UserUpsertWithWhereUniqueWithoutApi_keyInput[]
    createMany?: UserCreateManyApi_keyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutApi_keyInput | UserUpdateWithWhereUniqueWithoutApi_keyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutApi_keyInput | UserUpdateManyWithWhereWithoutApi_keyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AppUserCreateNestedOneWithoutApp_sessionsInput = {
    create?: XOR<AppUserCreateWithoutApp_sessionsInput, AppUserUncheckedCreateWithoutApp_sessionsInput>
    connectOrCreate?: AppUserCreateOrConnectWithoutApp_sessionsInput
    connect?: AppUserWhereUniqueInput
  }

  export type AppUserUpdateOneRequiredWithoutApp_sessionsNestedInput = {
    create?: XOR<AppUserCreateWithoutApp_sessionsInput, AppUserUncheckedCreateWithoutApp_sessionsInput>
    connectOrCreate?: AppUserCreateOrConnectWithoutApp_sessionsInput
    upsert?: AppUserUpsertWithoutApp_sessionsInput
    connect?: AppUserWhereUniqueInput
    update?: XOR<XOR<AppUserUpdateToOneWithWhereWithoutApp_sessionsInput, AppUserUpdateWithoutApp_sessionsInput>, AppUserUncheckedUpdateWithoutApp_sessionsInput>
  }

  export type ApiKeyCreateNestedOneWithoutUsersInput = {
    create?: XOR<ApiKeyCreateWithoutUsersInput, ApiKeyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUsersInput
    connect?: ApiKeyWhereUniqueInput
  }

  export type UserAccountCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput> | UserAccountCreateWithoutUserInput[] | UserAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAccountCreateOrConnectWithoutUserInput | UserAccountCreateOrConnectWithoutUserInput[]
    createMany?: UserAccountCreateManyUserInputEnvelope
    connect?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AuthLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthLogCreateWithoutUserInput, AuthLogUncheckedCreateWithoutUserInput> | AuthLogCreateWithoutUserInput[] | AuthLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthLogCreateOrConnectWithoutUserInput | AuthLogCreateOrConnectWithoutUserInput[]
    createMany?: AuthLogCreateManyUserInputEnvelope
    connect?: AuthLogWhereUniqueInput | AuthLogWhereUniqueInput[]
  }

  export type UserAccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput> | UserAccountCreateWithoutUserInput[] | UserAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAccountCreateOrConnectWithoutUserInput | UserAccountCreateOrConnectWithoutUserInput[]
    createMany?: UserAccountCreateManyUserInputEnvelope
    connect?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AuthLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthLogCreateWithoutUserInput, AuthLogUncheckedCreateWithoutUserInput> | AuthLogCreateWithoutUserInput[] | AuthLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthLogCreateOrConnectWithoutUserInput | AuthLogCreateOrConnectWithoutUserInput[]
    createMany?: AuthLogCreateManyUserInputEnvelope
    connect?: AuthLogWhereUniqueInput | AuthLogWhereUniqueInput[]
  }

  export type ApiKeyUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<ApiKeyCreateWithoutUsersInput, ApiKeyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUsersInput
    upsert?: ApiKeyUpsertWithoutUsersInput
    connect?: ApiKeyWhereUniqueInput
    update?: XOR<XOR<ApiKeyUpdateToOneWithWhereWithoutUsersInput, ApiKeyUpdateWithoutUsersInput>, ApiKeyUncheckedUpdateWithoutUsersInput>
  }

  export type UserAccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput> | UserAccountCreateWithoutUserInput[] | UserAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAccountCreateOrConnectWithoutUserInput | UserAccountCreateOrConnectWithoutUserInput[]
    upsert?: UserAccountUpsertWithWhereUniqueWithoutUserInput | UserAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAccountCreateManyUserInputEnvelope
    set?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    disconnect?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    delete?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    connect?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    update?: UserAccountUpdateWithWhereUniqueWithoutUserInput | UserAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAccountUpdateManyWithWhereWithoutUserInput | UserAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAccountScalarWhereInput | UserAccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AuthLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthLogCreateWithoutUserInput, AuthLogUncheckedCreateWithoutUserInput> | AuthLogCreateWithoutUserInput[] | AuthLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthLogCreateOrConnectWithoutUserInput | AuthLogCreateOrConnectWithoutUserInput[]
    upsert?: AuthLogUpsertWithWhereUniqueWithoutUserInput | AuthLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthLogCreateManyUserInputEnvelope
    set?: AuthLogWhereUniqueInput | AuthLogWhereUniqueInput[]
    disconnect?: AuthLogWhereUniqueInput | AuthLogWhereUniqueInput[]
    delete?: AuthLogWhereUniqueInput | AuthLogWhereUniqueInput[]
    connect?: AuthLogWhereUniqueInput | AuthLogWhereUniqueInput[]
    update?: AuthLogUpdateWithWhereUniqueWithoutUserInput | AuthLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthLogUpdateManyWithWhereWithoutUserInput | AuthLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthLogScalarWhereInput | AuthLogScalarWhereInput[]
  }

  export type UserAccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput> | UserAccountCreateWithoutUserInput[] | UserAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAccountCreateOrConnectWithoutUserInput | UserAccountCreateOrConnectWithoutUserInput[]
    upsert?: UserAccountUpsertWithWhereUniqueWithoutUserInput | UserAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAccountCreateManyUserInputEnvelope
    set?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    disconnect?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    delete?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    connect?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    update?: UserAccountUpdateWithWhereUniqueWithoutUserInput | UserAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAccountUpdateManyWithWhereWithoutUserInput | UserAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAccountScalarWhereInput | UserAccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AuthLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthLogCreateWithoutUserInput, AuthLogUncheckedCreateWithoutUserInput> | AuthLogCreateWithoutUserInput[] | AuthLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthLogCreateOrConnectWithoutUserInput | AuthLogCreateOrConnectWithoutUserInput[]
    upsert?: AuthLogUpsertWithWhereUniqueWithoutUserInput | AuthLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthLogCreateManyUserInputEnvelope
    set?: AuthLogWhereUniqueInput | AuthLogWhereUniqueInput[]
    disconnect?: AuthLogWhereUniqueInput | AuthLogWhereUniqueInput[]
    delete?: AuthLogWhereUniqueInput | AuthLogWhereUniqueInput[]
    connect?: AuthLogWhereUniqueInput | AuthLogWhereUniqueInput[]
    update?: AuthLogUpdateWithWhereUniqueWithoutUserInput | AuthLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthLogUpdateManyWithWhereWithoutUserInput | AuthLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthLogScalarWhereInput | AuthLogScalarWhereInput[]
  }

  export type UserAccountCreateNestedManyWithoutAccountInput = {
    create?: XOR<UserAccountCreateWithoutAccountInput, UserAccountUncheckedCreateWithoutAccountInput> | UserAccountCreateWithoutAccountInput[] | UserAccountUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: UserAccountCreateOrConnectWithoutAccountInput | UserAccountCreateOrConnectWithoutAccountInput[]
    createMany?: UserAccountCreateManyAccountInputEnvelope
    connect?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
  }

  export type UserAccountUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<UserAccountCreateWithoutAccountInput, UserAccountUncheckedCreateWithoutAccountInput> | UserAccountCreateWithoutAccountInput[] | UserAccountUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: UserAccountCreateOrConnectWithoutAccountInput | UserAccountCreateOrConnectWithoutAccountInput[]
    createMany?: UserAccountCreateManyAccountInputEnvelope
    connect?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
  }

  export type UserAccountUpdateManyWithoutAccountNestedInput = {
    create?: XOR<UserAccountCreateWithoutAccountInput, UserAccountUncheckedCreateWithoutAccountInput> | UserAccountCreateWithoutAccountInput[] | UserAccountUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: UserAccountCreateOrConnectWithoutAccountInput | UserAccountCreateOrConnectWithoutAccountInput[]
    upsert?: UserAccountUpsertWithWhereUniqueWithoutAccountInput | UserAccountUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: UserAccountCreateManyAccountInputEnvelope
    set?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    disconnect?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    delete?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    connect?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    update?: UserAccountUpdateWithWhereUniqueWithoutAccountInput | UserAccountUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: UserAccountUpdateManyWithWhereWithoutAccountInput | UserAccountUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: UserAccountScalarWhereInput | UserAccountScalarWhereInput[]
  }

  export type UserAccountUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<UserAccountCreateWithoutAccountInput, UserAccountUncheckedCreateWithoutAccountInput> | UserAccountCreateWithoutAccountInput[] | UserAccountUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: UserAccountCreateOrConnectWithoutAccountInput | UserAccountCreateOrConnectWithoutAccountInput[]
    upsert?: UserAccountUpsertWithWhereUniqueWithoutAccountInput | UserAccountUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: UserAccountCreateManyAccountInputEnvelope
    set?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    disconnect?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    delete?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    connect?: UserAccountWhereUniqueInput | UserAccountWhereUniqueInput[]
    update?: UserAccountUpdateWithWhereUniqueWithoutAccountInput | UserAccountUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: UserAccountUpdateManyWithWhereWithoutAccountInput | UserAccountUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: UserAccountScalarWhereInput | UserAccountScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutUser_accountsInput = {
    create?: XOR<AccountCreateWithoutUser_accountsInput, AccountUncheckedCreateWithoutUser_accountsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutUser_accountsInput
    connect?: AccountWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type AccountUpdateOneRequiredWithoutUser_accountsNestedInput = {
    create?: XOR<AccountCreateWithoutUser_accountsInput, AccountUncheckedCreateWithoutUser_accountsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutUser_accountsInput
    upsert?: AccountUpsertWithoutUser_accountsInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutUser_accountsInput, AccountUpdateWithoutUser_accountsInput>, AccountUncheckedUpdateWithoutUser_accountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAuth_logsInput = {
    create?: XOR<UserCreateWithoutAuth_logsInput, UserUncheckedCreateWithoutAuth_logsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuth_logsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumAuthEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.AuthEventType
  }

  export type EnumAuthEventStatusFieldUpdateOperationsInput = {
    set?: $Enums.AuthEventStatus
  }

  export type UserUpdateOneWithoutAuth_logsNestedInput = {
    create?: XOR<UserCreateWithoutAuth_logsInput, UserUncheckedCreateWithoutAuth_logsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuth_logsInput
    upsert?: UserUpsertWithoutAuth_logsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuth_logsInput, UserUpdateWithoutAuth_logsInput>, UserUncheckedUpdateWithoutAuth_logsInput>
  }

  export type AppUserCreateNestedOneWithoutPassword_resetsInput = {
    create?: XOR<AppUserCreateWithoutPassword_resetsInput, AppUserUncheckedCreateWithoutPassword_resetsInput>
    connectOrCreate?: AppUserCreateOrConnectWithoutPassword_resetsInput
    connect?: AppUserWhereUniqueInput
  }

  export type AppUserUpdateOneRequiredWithoutPassword_resetsNestedInput = {
    create?: XOR<AppUserCreateWithoutPassword_resetsInput, AppUserUncheckedCreateWithoutPassword_resetsInput>
    connectOrCreate?: AppUserCreateOrConnectWithoutPassword_resetsInput
    upsert?: AppUserUpsertWithoutPassword_resetsInput
    connect?: AppUserWhereUniqueInput
    update?: XOR<XOR<AppUserUpdateToOneWithWhereWithoutPassword_resetsInput, AppUserUpdateWithoutPassword_resetsInput>, AppUserUncheckedUpdateWithoutPassword_resetsInput>
  }

  export type AppUserCreateNestedOneWithoutAuth_eventsInput = {
    create?: XOR<AppUserCreateWithoutAuth_eventsInput, AppUserUncheckedCreateWithoutAuth_eventsInput>
    connectOrCreate?: AppUserCreateOrConnectWithoutAuth_eventsInput
    connect?: AppUserWhereUniqueInput
  }

  export type AppUserUpdateOneRequiredWithoutAuth_eventsNestedInput = {
    create?: XOR<AppUserCreateWithoutAuth_eventsInput, AppUserUncheckedCreateWithoutAuth_eventsInput>
    connectOrCreate?: AppUserCreateOrConnectWithoutAuth_eventsInput
    upsert?: AppUserUpsertWithoutAuth_eventsInput
    connect?: AppUserWhereUniqueInput
    update?: XOR<XOR<AppUserUpdateToOneWithWhereWithoutAuth_eventsInput, AppUserUpdateWithoutAuth_eventsInput>, AppUserUncheckedUpdateWithoutAuth_eventsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumAuthEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthEventType | EnumAuthEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuthEventType[]
    notIn?: $Enums.AuthEventType[]
    not?: NestedEnumAuthEventTypeFilter<$PrismaModel> | $Enums.AuthEventType
  }

  export type NestedEnumAuthEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthEventStatus | EnumAuthEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AuthEventStatus[]
    notIn?: $Enums.AuthEventStatus[]
    not?: NestedEnumAuthEventStatusFilter<$PrismaModel> | $Enums.AuthEventStatus
  }

  export type NestedEnumAuthEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthEventType | EnumAuthEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuthEventType[]
    notIn?: $Enums.AuthEventType[]
    not?: NestedEnumAuthEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.AuthEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthEventTypeFilter<$PrismaModel>
    _max?: NestedEnumAuthEventTypeFilter<$PrismaModel>
  }

  export type NestedEnumAuthEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthEventStatus | EnumAuthEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AuthEventStatus[]
    notIn?: $Enums.AuthEventStatus[]
    not?: NestedEnumAuthEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.AuthEventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthEventStatusFilter<$PrismaModel>
    _max?: NestedEnumAuthEventStatusFilter<$PrismaModel>
  }

  export type ApiKeyCreateWithoutApp_userInput = {
    id?: string
    key: string
    name: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_used_at?: Date | string | null
    expires_at?: Date | string | null
    users?: UserCreateNestedManyWithoutApi_keyInput
  }

  export type ApiKeyUncheckedCreateWithoutApp_userInput = {
    id?: string
    key: string
    name: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_used_at?: Date | string | null
    expires_at?: Date | string | null
    users?: UserUncheckedCreateNestedManyWithoutApi_keyInput
  }

  export type ApiKeyCreateOrConnectWithoutApp_userInput = {
    where: ApiKeyWhereUniqueInput
    create: XOR<ApiKeyCreateWithoutApp_userInput, ApiKeyUncheckedCreateWithoutApp_userInput>
  }

  export type ApiKeyCreateManyApp_userInputEnvelope = {
    data: ApiKeyCreateManyApp_userInput | ApiKeyCreateManyApp_userInput[]
    skipDuplicates?: boolean
  }

  export type AppSessionCreateWithoutApp_userInput = {
    id?: string
    token: string
    refresh_token?: string | null
    ip_address?: string | null
    user_agent?: string | null
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    revoked?: boolean
    revoked_at?: Date | string | null
  }

  export type AppSessionUncheckedCreateWithoutApp_userInput = {
    id?: string
    token: string
    refresh_token?: string | null
    ip_address?: string | null
    user_agent?: string | null
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    revoked?: boolean
    revoked_at?: Date | string | null
  }

  export type AppSessionCreateOrConnectWithoutApp_userInput = {
    where: AppSessionWhereUniqueInput
    create: XOR<AppSessionCreateWithoutApp_userInput, AppSessionUncheckedCreateWithoutApp_userInput>
  }

  export type AppSessionCreateManyApp_userInputEnvelope = {
    data: AppSessionCreateManyApp_userInput | AppSessionCreateManyApp_userInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetCreateWithoutApp_userInput = {
    id?: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    used?: boolean
  }

  export type PasswordResetUncheckedCreateWithoutApp_userInput = {
    id?: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    used?: boolean
  }

  export type PasswordResetCreateOrConnectWithoutApp_userInput = {
    where: PasswordResetWhereUniqueInput
    create: XOR<PasswordResetCreateWithoutApp_userInput, PasswordResetUncheckedCreateWithoutApp_userInput>
  }

  export type AuthEventCreateWithoutApp_userInput = {
    id?: string
    event_type: string
    ip_address?: string | null
    user_agent?: string | null
    details?: string | null
    created_at?: Date | string
  }

  export type AuthEventUncheckedCreateWithoutApp_userInput = {
    id?: string
    event_type: string
    ip_address?: string | null
    user_agent?: string | null
    details?: string | null
    created_at?: Date | string
  }

  export type AuthEventCreateOrConnectWithoutApp_userInput = {
    where: AuthEventWhereUniqueInput
    create: XOR<AuthEventCreateWithoutApp_userInput, AuthEventUncheckedCreateWithoutApp_userInput>
  }

  export type AuthEventCreateManyApp_userInputEnvelope = {
    data: AuthEventCreateManyApp_userInput | AuthEventCreateManyApp_userInput[]
    skipDuplicates?: boolean
  }

  export type ApiKeyUpsertWithWhereUniqueWithoutApp_userInput = {
    where: ApiKeyWhereUniqueInput
    update: XOR<ApiKeyUpdateWithoutApp_userInput, ApiKeyUncheckedUpdateWithoutApp_userInput>
    create: XOR<ApiKeyCreateWithoutApp_userInput, ApiKeyUncheckedCreateWithoutApp_userInput>
  }

  export type ApiKeyUpdateWithWhereUniqueWithoutApp_userInput = {
    where: ApiKeyWhereUniqueInput
    data: XOR<ApiKeyUpdateWithoutApp_userInput, ApiKeyUncheckedUpdateWithoutApp_userInput>
  }

  export type ApiKeyUpdateManyWithWhereWithoutApp_userInput = {
    where: ApiKeyScalarWhereInput
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyWithoutApp_userInput>
  }

  export type ApiKeyScalarWhereInput = {
    AND?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    OR?: ApiKeyScalarWhereInput[]
    NOT?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    app_user_id?: StringFilter<"ApiKey"> | string
    key?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    active?: BoolFilter<"ApiKey"> | boolean
    created_at?: DateTimeFilter<"ApiKey"> | Date | string
    updated_at?: DateTimeFilter<"ApiKey"> | Date | string
    last_used_at?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
  }

  export type AppSessionUpsertWithWhereUniqueWithoutApp_userInput = {
    where: AppSessionWhereUniqueInput
    update: XOR<AppSessionUpdateWithoutApp_userInput, AppSessionUncheckedUpdateWithoutApp_userInput>
    create: XOR<AppSessionCreateWithoutApp_userInput, AppSessionUncheckedCreateWithoutApp_userInput>
  }

  export type AppSessionUpdateWithWhereUniqueWithoutApp_userInput = {
    where: AppSessionWhereUniqueInput
    data: XOR<AppSessionUpdateWithoutApp_userInput, AppSessionUncheckedUpdateWithoutApp_userInput>
  }

  export type AppSessionUpdateManyWithWhereWithoutApp_userInput = {
    where: AppSessionScalarWhereInput
    data: XOR<AppSessionUpdateManyMutationInput, AppSessionUncheckedUpdateManyWithoutApp_userInput>
  }

  export type AppSessionScalarWhereInput = {
    AND?: AppSessionScalarWhereInput | AppSessionScalarWhereInput[]
    OR?: AppSessionScalarWhereInput[]
    NOT?: AppSessionScalarWhereInput | AppSessionScalarWhereInput[]
    id?: StringFilter<"AppSession"> | string
    app_user_id?: StringFilter<"AppSession"> | string
    token?: StringFilter<"AppSession"> | string
    refresh_token?: StringNullableFilter<"AppSession"> | string | null
    ip_address?: StringNullableFilter<"AppSession"> | string | null
    user_agent?: StringNullableFilter<"AppSession"> | string | null
    expires_at?: DateTimeFilter<"AppSession"> | Date | string
    created_at?: DateTimeFilter<"AppSession"> | Date | string
    updated_at?: DateTimeFilter<"AppSession"> | Date | string
    revoked?: BoolFilter<"AppSession"> | boolean
    revoked_at?: DateTimeNullableFilter<"AppSession"> | Date | string | null
  }

  export type PasswordResetUpsertWithoutApp_userInput = {
    update: XOR<PasswordResetUpdateWithoutApp_userInput, PasswordResetUncheckedUpdateWithoutApp_userInput>
    create: XOR<PasswordResetCreateWithoutApp_userInput, PasswordResetUncheckedCreateWithoutApp_userInput>
    where?: PasswordResetWhereInput
  }

  export type PasswordResetUpdateToOneWithWhereWithoutApp_userInput = {
    where?: PasswordResetWhereInput
    data: XOR<PasswordResetUpdateWithoutApp_userInput, PasswordResetUncheckedUpdateWithoutApp_userInput>
  }

  export type PasswordResetUpdateWithoutApp_userInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PasswordResetUncheckedUpdateWithoutApp_userInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AuthEventUpsertWithWhereUniqueWithoutApp_userInput = {
    where: AuthEventWhereUniqueInput
    update: XOR<AuthEventUpdateWithoutApp_userInput, AuthEventUncheckedUpdateWithoutApp_userInput>
    create: XOR<AuthEventCreateWithoutApp_userInput, AuthEventUncheckedCreateWithoutApp_userInput>
  }

  export type AuthEventUpdateWithWhereUniqueWithoutApp_userInput = {
    where: AuthEventWhereUniqueInput
    data: XOR<AuthEventUpdateWithoutApp_userInput, AuthEventUncheckedUpdateWithoutApp_userInput>
  }

  export type AuthEventUpdateManyWithWhereWithoutApp_userInput = {
    where: AuthEventScalarWhereInput
    data: XOR<AuthEventUpdateManyMutationInput, AuthEventUncheckedUpdateManyWithoutApp_userInput>
  }

  export type AuthEventScalarWhereInput = {
    AND?: AuthEventScalarWhereInput | AuthEventScalarWhereInput[]
    OR?: AuthEventScalarWhereInput[]
    NOT?: AuthEventScalarWhereInput | AuthEventScalarWhereInput[]
    id?: StringFilter<"AuthEvent"> | string
    app_user_id?: StringFilter<"AuthEvent"> | string
    event_type?: StringFilter<"AuthEvent"> | string
    ip_address?: StringNullableFilter<"AuthEvent"> | string | null
    user_agent?: StringNullableFilter<"AuthEvent"> | string | null
    details?: StringNullableFilter<"AuthEvent"> | string | null
    created_at?: DateTimeFilter<"AuthEvent"> | Date | string
  }

  export type AppUserCreateWithoutApi_keysInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    company_name?: string | null
    phone?: string | null
    website?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    app_sessions?: AppSessionCreateNestedManyWithoutApp_userInput
    password_resets?: PasswordResetCreateNestedOneWithoutApp_userInput
    auth_events?: AuthEventCreateNestedManyWithoutApp_userInput
  }

  export type AppUserUncheckedCreateWithoutApi_keysInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    company_name?: string | null
    phone?: string | null
    website?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    app_sessions?: AppSessionUncheckedCreateNestedManyWithoutApp_userInput
    password_resets?: PasswordResetUncheckedCreateNestedOneWithoutApp_userInput
    auth_events?: AuthEventUncheckedCreateNestedManyWithoutApp_userInput
  }

  export type AppUserCreateOrConnectWithoutApi_keysInput = {
    where: AppUserWhereUniqueInput
    create: XOR<AppUserCreateWithoutApi_keysInput, AppUserUncheckedCreateWithoutApi_keysInput>
  }

  export type UserCreateWithoutApi_keyInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    ip_address?: string | null
    user_agent?: string | null
    accounts?: UserAccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    auth_logs?: AuthLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApi_keyInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    ip_address?: string | null
    user_agent?: string | null
    accounts?: UserAccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    auth_logs?: AuthLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApi_keyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApi_keyInput, UserUncheckedCreateWithoutApi_keyInput>
  }

  export type UserCreateManyApi_keyInputEnvelope = {
    data: UserCreateManyApi_keyInput | UserCreateManyApi_keyInput[]
    skipDuplicates?: boolean
  }

  export type AppUserUpsertWithoutApi_keysInput = {
    update: XOR<AppUserUpdateWithoutApi_keysInput, AppUserUncheckedUpdateWithoutApi_keysInput>
    create: XOR<AppUserCreateWithoutApi_keysInput, AppUserUncheckedCreateWithoutApi_keysInput>
    where?: AppUserWhereInput
  }

  export type AppUserUpdateToOneWithWhereWithoutApi_keysInput = {
    where?: AppUserWhereInput
    data: XOR<AppUserUpdateWithoutApi_keysInput, AppUserUncheckedUpdateWithoutApi_keysInput>
  }

  export type AppUserUpdateWithoutApi_keysInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    app_sessions?: AppSessionUpdateManyWithoutApp_userNestedInput
    password_resets?: PasswordResetUpdateOneWithoutApp_userNestedInput
    auth_events?: AuthEventUpdateManyWithoutApp_userNestedInput
  }

  export type AppUserUncheckedUpdateWithoutApi_keysInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    app_sessions?: AppSessionUncheckedUpdateManyWithoutApp_userNestedInput
    password_resets?: PasswordResetUncheckedUpdateOneWithoutApp_userNestedInput
    auth_events?: AuthEventUncheckedUpdateManyWithoutApp_userNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutApi_keyInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutApi_keyInput, UserUncheckedUpdateWithoutApi_keyInput>
    create: XOR<UserCreateWithoutApi_keyInput, UserUncheckedCreateWithoutApi_keyInput>
  }

  export type UserUpdateWithWhereUniqueWithoutApi_keyInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutApi_keyInput, UserUncheckedUpdateWithoutApi_keyInput>
  }

  export type UserUpdateManyWithWhereWithoutApi_keyInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutApi_keyInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    api_key_id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    active?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    email_verified?: BoolFilter<"User"> | boolean
    email_verified_at?: DateTimeNullableFilter<"User"> | Date | string | null
    reset_token?: StringNullableFilter<"User"> | string | null
    reset_token_expires?: DateTimeNullableFilter<"User"> | Date | string | null
    ip_address?: StringNullableFilter<"User"> | string | null
    user_agent?: StringNullableFilter<"User"> | string | null
  }

  export type AppUserCreateWithoutApp_sessionsInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    company_name?: string | null
    phone?: string | null
    website?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    api_keys?: ApiKeyCreateNestedManyWithoutApp_userInput
    password_resets?: PasswordResetCreateNestedOneWithoutApp_userInput
    auth_events?: AuthEventCreateNestedManyWithoutApp_userInput
  }

  export type AppUserUncheckedCreateWithoutApp_sessionsInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    company_name?: string | null
    phone?: string | null
    website?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    api_keys?: ApiKeyUncheckedCreateNestedManyWithoutApp_userInput
    password_resets?: PasswordResetUncheckedCreateNestedOneWithoutApp_userInput
    auth_events?: AuthEventUncheckedCreateNestedManyWithoutApp_userInput
  }

  export type AppUserCreateOrConnectWithoutApp_sessionsInput = {
    where: AppUserWhereUniqueInput
    create: XOR<AppUserCreateWithoutApp_sessionsInput, AppUserUncheckedCreateWithoutApp_sessionsInput>
  }

  export type AppUserUpsertWithoutApp_sessionsInput = {
    update: XOR<AppUserUpdateWithoutApp_sessionsInput, AppUserUncheckedUpdateWithoutApp_sessionsInput>
    create: XOR<AppUserCreateWithoutApp_sessionsInput, AppUserUncheckedCreateWithoutApp_sessionsInput>
    where?: AppUserWhereInput
  }

  export type AppUserUpdateToOneWithWhereWithoutApp_sessionsInput = {
    where?: AppUserWhereInput
    data: XOR<AppUserUpdateWithoutApp_sessionsInput, AppUserUncheckedUpdateWithoutApp_sessionsInput>
  }

  export type AppUserUpdateWithoutApp_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    api_keys?: ApiKeyUpdateManyWithoutApp_userNestedInput
    password_resets?: PasswordResetUpdateOneWithoutApp_userNestedInput
    auth_events?: AuthEventUpdateManyWithoutApp_userNestedInput
  }

  export type AppUserUncheckedUpdateWithoutApp_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    api_keys?: ApiKeyUncheckedUpdateManyWithoutApp_userNestedInput
    password_resets?: PasswordResetUncheckedUpdateOneWithoutApp_userNestedInput
    auth_events?: AuthEventUncheckedUpdateManyWithoutApp_userNestedInput
  }

  export type ApiKeyCreateWithoutUsersInput = {
    id?: string
    key: string
    name: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_used_at?: Date | string | null
    expires_at?: Date | string | null
    app_user: AppUserCreateNestedOneWithoutApi_keysInput
  }

  export type ApiKeyUncheckedCreateWithoutUsersInput = {
    id?: string
    app_user_id: string
    key: string
    name: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_used_at?: Date | string | null
    expires_at?: Date | string | null
  }

  export type ApiKeyCreateOrConnectWithoutUsersInput = {
    where: ApiKeyWhereUniqueInput
    create: XOR<ApiKeyCreateWithoutUsersInput, ApiKeyUncheckedCreateWithoutUsersInput>
  }

  export type UserAccountCreateWithoutUserInput = {
    id?: string
    created_at?: Date | string
    created_by?: string | null
    account: AccountCreateNestedOneWithoutUser_accountsInput
  }

  export type UserAccountUncheckedCreateWithoutUserInput = {
    id?: string
    account_id: string
    created_at?: Date | string
    created_by?: string | null
  }

  export type UserAccountCreateOrConnectWithoutUserInput = {
    where: UserAccountWhereUniqueInput
    create: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
  }

  export type UserAccountCreateManyUserInputEnvelope = {
    data: UserAccountCreateManyUserInput | UserAccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    token: string
    refresh_token?: string | null
    ip_address?: string | null
    user_agent?: string | null
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    revoked?: boolean
    revoked_at?: Date | string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    refresh_token?: string | null
    ip_address?: string | null
    user_agent?: string | null
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    revoked?: boolean
    revoked_at?: Date | string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuthLogCreateWithoutUserInput = {
    id?: string
    event_type: $Enums.AuthEventType
    status: $Enums.AuthEventStatus
    ip_address?: string | null
    user_agent?: string | null
    details?: string | null
    created_at?: Date | string
  }

  export type AuthLogUncheckedCreateWithoutUserInput = {
    id?: string
    event_type: $Enums.AuthEventType
    status: $Enums.AuthEventStatus
    ip_address?: string | null
    user_agent?: string | null
    details?: string | null
    created_at?: Date | string
  }

  export type AuthLogCreateOrConnectWithoutUserInput = {
    where: AuthLogWhereUniqueInput
    create: XOR<AuthLogCreateWithoutUserInput, AuthLogUncheckedCreateWithoutUserInput>
  }

  export type AuthLogCreateManyUserInputEnvelope = {
    data: AuthLogCreateManyUserInput | AuthLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ApiKeyUpsertWithoutUsersInput = {
    update: XOR<ApiKeyUpdateWithoutUsersInput, ApiKeyUncheckedUpdateWithoutUsersInput>
    create: XOR<ApiKeyCreateWithoutUsersInput, ApiKeyUncheckedCreateWithoutUsersInput>
    where?: ApiKeyWhereInput
  }

  export type ApiKeyUpdateToOneWithWhereWithoutUsersInput = {
    where?: ApiKeyWhereInput
    data: XOR<ApiKeyUpdateWithoutUsersInput, ApiKeyUncheckedUpdateWithoutUsersInput>
  }

  export type ApiKeyUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    app_user?: AppUserUpdateOneRequiredWithoutApi_keysNestedInput
  }

  export type ApiKeyUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_user_id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserAccountUpsertWithWhereUniqueWithoutUserInput = {
    where: UserAccountWhereUniqueInput
    update: XOR<UserAccountUpdateWithoutUserInput, UserAccountUncheckedUpdateWithoutUserInput>
    create: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
  }

  export type UserAccountUpdateWithWhereUniqueWithoutUserInput = {
    where: UserAccountWhereUniqueInput
    data: XOR<UserAccountUpdateWithoutUserInput, UserAccountUncheckedUpdateWithoutUserInput>
  }

  export type UserAccountUpdateManyWithWhereWithoutUserInput = {
    where: UserAccountScalarWhereInput
    data: XOR<UserAccountUpdateManyMutationInput, UserAccountUncheckedUpdateManyWithoutUserInput>
  }

  export type UserAccountScalarWhereInput = {
    AND?: UserAccountScalarWhereInput | UserAccountScalarWhereInput[]
    OR?: UserAccountScalarWhereInput[]
    NOT?: UserAccountScalarWhereInput | UserAccountScalarWhereInput[]
    id?: StringFilter<"UserAccount"> | string
    user_id?: StringFilter<"UserAccount"> | string
    account_id?: StringFilter<"UserAccount"> | string
    created_at?: DateTimeFilter<"UserAccount"> | Date | string
    created_by?: StringNullableFilter<"UserAccount"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    user_id?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    refresh_token?: StringNullableFilter<"Session"> | string | null
    ip_address?: StringNullableFilter<"Session"> | string | null
    user_agent?: StringNullableFilter<"Session"> | string | null
    expires_at?: DateTimeFilter<"Session"> | Date | string
    created_at?: DateTimeFilter<"Session"> | Date | string
    updated_at?: DateTimeFilter<"Session"> | Date | string
    revoked?: BoolFilter<"Session"> | boolean
    revoked_at?: DateTimeNullableFilter<"Session"> | Date | string | null
  }

  export type AuthLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuthLogWhereUniqueInput
    update: XOR<AuthLogUpdateWithoutUserInput, AuthLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuthLogCreateWithoutUserInput, AuthLogUncheckedCreateWithoutUserInput>
  }

  export type AuthLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuthLogWhereUniqueInput
    data: XOR<AuthLogUpdateWithoutUserInput, AuthLogUncheckedUpdateWithoutUserInput>
  }

  export type AuthLogUpdateManyWithWhereWithoutUserInput = {
    where: AuthLogScalarWhereInput
    data: XOR<AuthLogUpdateManyMutationInput, AuthLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuthLogScalarWhereInput = {
    AND?: AuthLogScalarWhereInput | AuthLogScalarWhereInput[]
    OR?: AuthLogScalarWhereInput[]
    NOT?: AuthLogScalarWhereInput | AuthLogScalarWhereInput[]
    id?: StringFilter<"AuthLog"> | string
    user_id?: StringNullableFilter<"AuthLog"> | string | null
    event_type?: EnumAuthEventTypeFilter<"AuthLog"> | $Enums.AuthEventType
    status?: EnumAuthEventStatusFilter<"AuthLog"> | $Enums.AuthEventStatus
    ip_address?: StringNullableFilter<"AuthLog"> | string | null
    user_agent?: StringNullableFilter<"AuthLog"> | string | null
    details?: StringNullableFilter<"AuthLog"> | string | null
    created_at?: DateTimeFilter<"AuthLog"> | Date | string
  }

  export type UserAccountCreateWithoutAccountInput = {
    id?: string
    created_at?: Date | string
    created_by?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type UserAccountUncheckedCreateWithoutAccountInput = {
    id?: string
    user_id: string
    created_at?: Date | string
    created_by?: string | null
  }

  export type UserAccountCreateOrConnectWithoutAccountInput = {
    where: UserAccountWhereUniqueInput
    create: XOR<UserAccountCreateWithoutAccountInput, UserAccountUncheckedCreateWithoutAccountInput>
  }

  export type UserAccountCreateManyAccountInputEnvelope = {
    data: UserAccountCreateManyAccountInput | UserAccountCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type UserAccountUpsertWithWhereUniqueWithoutAccountInput = {
    where: UserAccountWhereUniqueInput
    update: XOR<UserAccountUpdateWithoutAccountInput, UserAccountUncheckedUpdateWithoutAccountInput>
    create: XOR<UserAccountCreateWithoutAccountInput, UserAccountUncheckedCreateWithoutAccountInput>
  }

  export type UserAccountUpdateWithWhereUniqueWithoutAccountInput = {
    where: UserAccountWhereUniqueInput
    data: XOR<UserAccountUpdateWithoutAccountInput, UserAccountUncheckedUpdateWithoutAccountInput>
  }

  export type UserAccountUpdateManyWithWhereWithoutAccountInput = {
    where: UserAccountScalarWhereInput
    data: XOR<UserAccountUpdateManyMutationInput, UserAccountUncheckedUpdateManyWithoutAccountInput>
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    ip_address?: string | null
    user_agent?: string | null
    api_key: ApiKeyCreateNestedOneWithoutUsersInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    auth_logs?: AuthLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    api_key_id: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    ip_address?: string | null
    user_agent?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    auth_logs?: AuthLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type AccountCreateWithoutUser_accountsInput = {
    id?: string
    name: string
    api_key: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AccountUncheckedCreateWithoutUser_accountsInput = {
    id?: string
    name: string
    api_key: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AccountCreateOrConnectWithoutUser_accountsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUser_accountsInput, AccountUncheckedCreateWithoutUser_accountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    api_key?: ApiKeyUpdateOneRequiredWithoutUsersNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    auth_logs?: AuthLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    api_key_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    auth_logs?: AuthLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountUpsertWithoutUser_accountsInput = {
    update: XOR<AccountUpdateWithoutUser_accountsInput, AccountUncheckedUpdateWithoutUser_accountsInput>
    create: XOR<AccountCreateWithoutUser_accountsInput, AccountUncheckedCreateWithoutUser_accountsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutUser_accountsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutUser_accountsInput, AccountUncheckedUpdateWithoutUser_accountsInput>
  }

  export type AccountUpdateWithoutUser_accountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUser_accountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    ip_address?: string | null
    user_agent?: string | null
    api_key: ApiKeyCreateNestedOneWithoutUsersInput
    accounts?: UserAccountCreateNestedManyWithoutUserInput
    auth_logs?: AuthLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    api_key_id: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    ip_address?: string | null
    user_agent?: string | null
    accounts?: UserAccountUncheckedCreateNestedManyWithoutUserInput
    auth_logs?: AuthLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    api_key?: ApiKeyUpdateOneRequiredWithoutUsersNestedInput
    accounts?: UserAccountUpdateManyWithoutUserNestedInput
    auth_logs?: AuthLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    api_key_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: UserAccountUncheckedUpdateManyWithoutUserNestedInput
    auth_logs?: AuthLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuth_logsInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    ip_address?: string | null
    user_agent?: string | null
    api_key: ApiKeyCreateNestedOneWithoutUsersInput
    accounts?: UserAccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuth_logsInput = {
    id?: string
    api_key_id: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    ip_address?: string | null
    user_agent?: string | null
    accounts?: UserAccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuth_logsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuth_logsInput, UserUncheckedCreateWithoutAuth_logsInput>
  }

  export type UserUpsertWithoutAuth_logsInput = {
    update: XOR<UserUpdateWithoutAuth_logsInput, UserUncheckedUpdateWithoutAuth_logsInput>
    create: XOR<UserCreateWithoutAuth_logsInput, UserUncheckedCreateWithoutAuth_logsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuth_logsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuth_logsInput, UserUncheckedUpdateWithoutAuth_logsInput>
  }

  export type UserUpdateWithoutAuth_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    api_key?: ApiKeyUpdateOneRequiredWithoutUsersNestedInput
    accounts?: UserAccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuth_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    api_key_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: UserAccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AppUserCreateWithoutPassword_resetsInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    company_name?: string | null
    phone?: string | null
    website?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    api_keys?: ApiKeyCreateNestedManyWithoutApp_userInput
    app_sessions?: AppSessionCreateNestedManyWithoutApp_userInput
    auth_events?: AuthEventCreateNestedManyWithoutApp_userInput
  }

  export type AppUserUncheckedCreateWithoutPassword_resetsInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    company_name?: string | null
    phone?: string | null
    website?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    api_keys?: ApiKeyUncheckedCreateNestedManyWithoutApp_userInput
    app_sessions?: AppSessionUncheckedCreateNestedManyWithoutApp_userInput
    auth_events?: AuthEventUncheckedCreateNestedManyWithoutApp_userInput
  }

  export type AppUserCreateOrConnectWithoutPassword_resetsInput = {
    where: AppUserWhereUniqueInput
    create: XOR<AppUserCreateWithoutPassword_resetsInput, AppUserUncheckedCreateWithoutPassword_resetsInput>
  }

  export type AppUserUpsertWithoutPassword_resetsInput = {
    update: XOR<AppUserUpdateWithoutPassword_resetsInput, AppUserUncheckedUpdateWithoutPassword_resetsInput>
    create: XOR<AppUserCreateWithoutPassword_resetsInput, AppUserUncheckedCreateWithoutPassword_resetsInput>
    where?: AppUserWhereInput
  }

  export type AppUserUpdateToOneWithWhereWithoutPassword_resetsInput = {
    where?: AppUserWhereInput
    data: XOR<AppUserUpdateWithoutPassword_resetsInput, AppUserUncheckedUpdateWithoutPassword_resetsInput>
  }

  export type AppUserUpdateWithoutPassword_resetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    api_keys?: ApiKeyUpdateManyWithoutApp_userNestedInput
    app_sessions?: AppSessionUpdateManyWithoutApp_userNestedInput
    auth_events?: AuthEventUpdateManyWithoutApp_userNestedInput
  }

  export type AppUserUncheckedUpdateWithoutPassword_resetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    api_keys?: ApiKeyUncheckedUpdateManyWithoutApp_userNestedInput
    app_sessions?: AppSessionUncheckedUpdateManyWithoutApp_userNestedInput
    auth_events?: AuthEventUncheckedUpdateManyWithoutApp_userNestedInput
  }

  export type AppUserCreateWithoutAuth_eventsInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    company_name?: string | null
    phone?: string | null
    website?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    api_keys?: ApiKeyCreateNestedManyWithoutApp_userInput
    app_sessions?: AppSessionCreateNestedManyWithoutApp_userInput
    password_resets?: PasswordResetCreateNestedOneWithoutApp_userInput
  }

  export type AppUserUncheckedCreateWithoutAuth_eventsInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    company_name?: string | null
    phone?: string | null
    website?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    api_keys?: ApiKeyUncheckedCreateNestedManyWithoutApp_userInput
    app_sessions?: AppSessionUncheckedCreateNestedManyWithoutApp_userInput
    password_resets?: PasswordResetUncheckedCreateNestedOneWithoutApp_userInput
  }

  export type AppUserCreateOrConnectWithoutAuth_eventsInput = {
    where: AppUserWhereUniqueInput
    create: XOR<AppUserCreateWithoutAuth_eventsInput, AppUserUncheckedCreateWithoutAuth_eventsInput>
  }

  export type AppUserUpsertWithoutAuth_eventsInput = {
    update: XOR<AppUserUpdateWithoutAuth_eventsInput, AppUserUncheckedUpdateWithoutAuth_eventsInput>
    create: XOR<AppUserCreateWithoutAuth_eventsInput, AppUserUncheckedCreateWithoutAuth_eventsInput>
    where?: AppUserWhereInput
  }

  export type AppUserUpdateToOneWithWhereWithoutAuth_eventsInput = {
    where?: AppUserWhereInput
    data: XOR<AppUserUpdateWithoutAuth_eventsInput, AppUserUncheckedUpdateWithoutAuth_eventsInput>
  }

  export type AppUserUpdateWithoutAuth_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    api_keys?: ApiKeyUpdateManyWithoutApp_userNestedInput
    app_sessions?: AppSessionUpdateManyWithoutApp_userNestedInput
    password_resets?: PasswordResetUpdateOneWithoutApp_userNestedInput
  }

  export type AppUserUncheckedUpdateWithoutAuth_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    api_keys?: ApiKeyUncheckedUpdateManyWithoutApp_userNestedInput
    app_sessions?: AppSessionUncheckedUpdateManyWithoutApp_userNestedInput
    password_resets?: PasswordResetUncheckedUpdateOneWithoutApp_userNestedInput
  }

  export type ApiKeyCreateManyApp_userInput = {
    id?: string
    key: string
    name: string
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_used_at?: Date | string | null
    expires_at?: Date | string | null
  }

  export type AppSessionCreateManyApp_userInput = {
    id?: string
    token: string
    refresh_token?: string | null
    ip_address?: string | null
    user_agent?: string | null
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    revoked?: boolean
    revoked_at?: Date | string | null
  }

  export type AuthEventCreateManyApp_userInput = {
    id?: string
    event_type: string
    ip_address?: string | null
    user_agent?: string | null
    details?: string | null
    created_at?: Date | string
  }

  export type ApiKeyUpdateWithoutApp_userInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUpdateManyWithoutApi_keyNestedInput
  }

  export type ApiKeyUncheckedUpdateWithoutApp_userInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: UserUncheckedUpdateManyWithoutApi_keyNestedInput
  }

  export type ApiKeyUncheckedUpdateManyWithoutApp_userInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppSessionUpdateWithoutApp_userInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppSessionUncheckedUpdateWithoutApp_userInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppSessionUncheckedUpdateManyWithoutApp_userInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuthEventUpdateWithoutApp_userInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthEventUncheckedUpdateWithoutApp_userInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthEventUncheckedUpdateManyWithoutApp_userInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyApi_keyInput = {
    id?: string
    email: string
    username: string
    password_hash: string
    name?: string | null
    active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    email_verified?: boolean
    email_verified_at?: Date | string | null
    reset_token?: string | null
    reset_token_expires?: Date | string | null
    ip_address?: string | null
    user_agent?: string | null
  }

  export type UserUpdateWithoutApi_keyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: UserAccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    auth_logs?: AuthLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApi_keyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: UserAccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    auth_logs?: AuthLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutApi_keyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    email_verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserAccountCreateManyUserInput = {
    id?: string
    account_id: string
    created_at?: Date | string
    created_by?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    token: string
    refresh_token?: string | null
    ip_address?: string | null
    user_agent?: string | null
    expires_at: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    revoked?: boolean
    revoked_at?: Date | string | null
  }

  export type AuthLogCreateManyUserInput = {
    id?: string
    event_type: $Enums.AuthEventType
    status: $Enums.AuthEventStatus
    ip_address?: string | null
    user_agent?: string | null
    details?: string | null
    created_at?: Date | string
  }

  export type UserAccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    account?: AccountUpdateOneRequiredWithoutUser_accountsNestedInput
  }

  export type UserAccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserAccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    account_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuthLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: EnumAuthEventTypeFieldUpdateOperationsInput | $Enums.AuthEventType
    status?: EnumAuthEventStatusFieldUpdateOperationsInput | $Enums.AuthEventStatus
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: EnumAuthEventTypeFieldUpdateOperationsInput | $Enums.AuthEventType
    status?: EnumAuthEventStatusFieldUpdateOperationsInput | $Enums.AuthEventStatus
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: EnumAuthEventTypeFieldUpdateOperationsInput | $Enums.AuthEventType
    status?: EnumAuthEventStatusFieldUpdateOperationsInput | $Enums.AuthEventStatus
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAccountCreateManyAccountInput = {
    id?: string
    user_id: string
    created_at?: Date | string
    created_by?: string | null
  }

  export type UserAccountUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type UserAccountUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserAccountUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}